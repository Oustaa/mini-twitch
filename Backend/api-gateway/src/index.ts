import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import RateLimiter from "./utils/rateLimiter";
import proxyTo from "./utils/proxyTo";
import { config } from "./config";
import { AppRoutes } from "./routes";
import compression from "compression";
import cookieSession from "cookie-session";
import { axiosAuthInstance } from "./services/auth";

const app = express();

app.use(
  cors({
    origin: config.CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.set("trust proxy", 1);
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(
  cookieSession({
    name: "session",
    keys: [`${config.SECRET_KEY_1}`, `${config.SECRET_KEY_2}`],
    maxAge: 24 * 7 * 3600000,
    secure: config.NODE_ENV !== "development",
    ...(config.NODE_ENV !== "development" && {
      sameSite: "none",
    }),
  }),
);

app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.session?.jwt) {
    axiosAuthInstance.defaults.headers["Authorization"] =
      `Bearer ${req.session?.jwt}`;
  }
  next();
});

const AuthLimiter = new RateLimiter("Seconds", 10, 10);

app.use((req, res, next) => {
  if (req.url.startsWith("/auth")) {
    if (!AuthLimiter.check(req)) {
      res.status(429).json({ error: "too many request" });
      console.log("SHOULD BE BLOCKED");
      return;
    }
  }

  next();
});

AppRoutes.routes(app);

app.use("/chat", proxyTo({ host: "chat", port: 3000 }));
app.use("/live", proxyTo({ host: "live", port: 3000 }));
app.use("/vod", proxyTo({ host: "vod", port: 3000 }));

app.listen(config.PORT, () => {
  console.log(`Application listing on port: ${config.PORT}`);
});

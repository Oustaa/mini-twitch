import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import RateLimiter from "./utils/rateLimiter";
import proxyTo from "./utils/proxyTo";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

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

app.use("/auth", proxyTo({ host: "auth", port: 3000 }));
app.use("/chat", proxyTo({ host: "chat", port: 3000 }));
app.use("/live", proxyTo({ host: "live", port: 3000 }));
app.use("/vod", proxyTo({ host: "vod", port: 3000 }));

app.listen(PORT, () => {
  console.log(`Application listing on port: ${PORT}`);
});

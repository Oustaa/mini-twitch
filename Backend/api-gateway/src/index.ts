import dotenv from "dotenv";
import express from "express";
import RateLimiter from "./utils/rateLimiter";

dotenv.config();

const PORT = process.env.PORT || 9001;

const app = express();

// const limits: {
//   endpointPrefix: string;
//   limit: number;
//   window: LimitWindow;
//   windowCount?: number;
// }[] = [
//   {
//     endpointPrefix: "/auth",
//     limit: 10,
//     window: "Seconds",
//   },
// ];

// limiters
const AuthLimiter = new RateLimiter("Hours", 10, 2);

app.use((req, res, next) => {
  if (req.url.startsWith("/auth")) {
    if (AuthLimiter.check(req)) {
      console.log("PASSSED");
    } else {
      res.status(429).json({ error: "too many request" });
      console.log("SHOULD BE BLOCKED");
      return;
    }
  }

  next();
});

app.get(/.*/, (req, res) => {
  res.send("Hello there");
});

app.listen(PORT, () => {
  console.log(`Application listing on port: ${PORT}`);
});

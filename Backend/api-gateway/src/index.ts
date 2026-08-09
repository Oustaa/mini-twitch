import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import RateLimiter from "./utils/rateLimiter";

dotenv.config();

const PORT = process.env.PORT || 3000;

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

app.use(
  cors({
    origin: "*",
  }),
);

// limiters
const AuthLimiter = new RateLimiter("Hours", 10, 2);

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

app.get("/users", (_, res) => {
  res.json({
    users: [
      { name: "Younnes tailba", age: 29 },
      { name: "Oussama tailba", age: 28 },
      { name: "Khalid tailba", age: 18 },
      { name: "Abde Eladim tailba", age: 23 },
    ],
  });
});

app.get(/.*/, (_, res) => {
  res.send("Hello there");
});

app.listen(PORT, () => {
  console.log(`Application listing on port: ${PORT}`);
});

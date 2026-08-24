import { Application } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";

export class AppRoutes {
  public static routes(app: Application) {
    app.use("/auth", authRoutes.route());
    app.use("/user", userRoutes.route());
  }
}

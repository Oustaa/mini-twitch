import { Application } from "express";
import { authRoutes } from "./auth";

export class AppRoutes {
  public static routes(app: Application) {
    app.use("", authRoutes.route());
  }
}

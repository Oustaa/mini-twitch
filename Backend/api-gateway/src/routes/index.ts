import { Application } from "express";
import { V1Routes } from "../Api/V1/routes/v1Routes";

export class AppRoutes {
  public static routes(app: Application) {
    app.use("/api/v1", V1Routes.routes());
  }
}

import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";

export class V1Routes {
  public static routes(): Router {
    const router = Router();

    router.use("/auth", authRoutes.route());
    router.use("/user", userRoutes.route());

    return router;
  }
}

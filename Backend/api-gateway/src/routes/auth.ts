import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { authMiddleware } from "../middlewares/authMiddleware";

class AuthRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  public route(): Router {
    this.router.post("/auth/login", AuthController.login);
    this.router.post("/auth/sigin", AuthController.signin);
    this.router.post("/auth/logout", authMiddleware, AuthController.logout);
    this.router.post("/auth/verify", authMiddleware, AuthController.verify);

    return this.router;
  }
}

export const authRoutes = new AuthRoutes();

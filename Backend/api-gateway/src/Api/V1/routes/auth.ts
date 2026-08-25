import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { authMiddleware } from "../../../middlewares/authMiddleware";

class AuthRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  public route(): Router {
    this.router.post("/login", AuthController.login);
    this.router.post("/signup", AuthController.signup);
    this.router.post("/logout", authMiddleware, AuthController.logout);
    this.router.post("/verify", authMiddleware, AuthController.verify);

    return this.router;
  }
}

export const authRoutes = new AuthRoutes();

import { Router } from "express";
import { UserController } from "../controllers/user";

class UserRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  public route(): Router {
    this.router.post("/verify-username", UserController.verifyUsername);

    return this.router;
  }
}

export const userRoutes = new UserRoutes();

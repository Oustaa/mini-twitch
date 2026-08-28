import { Router } from "express";
import { UserController } from "../controllers/user";

class UserRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  public route(): Router {
    this.router.get("/verify-username", UserController.verifyUsername);
    this.router.get(
      "/get-username-suggestions",
      UserController.getUsernameSuggestions,
    );

    return this.router;
  }
}

export const userRoutes = new UserRoutes();

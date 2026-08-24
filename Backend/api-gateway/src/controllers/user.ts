import { Request, Response } from "express";
import { StaticClass } from "../utils/StaticClass";
import { AxiosResponse } from "axios";
import { userService } from "../services/user";

export class UserController extends StaticClass {
  constructor() {
    super();
  }

  public static async verifyUsername(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await userService.verifyUsername(
      req.query.username as string,
    );

    res.status(response.status).json(response.data);
  }
}

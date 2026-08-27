import { Request, Response } from "express";
import { StaticClass } from "../../../utils/StaticClass";
import { AxiosResponse } from "axios";
import { authService } from "../services/auth";

export class AuthController extends StaticClass {
  constructor() {
    super();
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.login(req.body);

    const {
      body: { user, token },
    } = response.data;

    req.session = { jwt: token };

    res.status(response.status).json({ user });
  }

  public static async signup(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.signup(req.body);

    res.status(response.status).json({});
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.logout();

    req.session = null;

    res.status(response.status).json(response.data);
  }

  public static async verify(_: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.verify();

    res.status(response.status).json(response.data);
  }
}

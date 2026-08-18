import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { config } from "../config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessionToken = req.session?.jwt;

  if (!sessionToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Token not provided",
    });
    return;
  }

  try {
    req.currentUser = verify(sessionToken, `${config.JWT_TOKEN}`) as JwtPayload;
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Token is not valid. Please login again.",
    });
    return;
  }

  next();
}

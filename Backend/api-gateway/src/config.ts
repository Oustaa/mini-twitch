import dotenv from "dotenv";

dotenv.config();

type ENV_TYPE = string | undefined;

class Config {
  public PORT: ENV_TYPE;
  public NODE_ENV: ENV_TYPE;
  public CLIENT_ORIGIN: ENV_TYPE;

  public GATEWAY_JWT_TOKEN: ENV_TYPE;
  public JWT_TOKEN: ENV_TYPE;
  public SECRET_KEY_1: ENV_TYPE;
  public SECRET_KEY_2: ENV_TYPE;

  public AUTH_BASE_URL: ENV_TYPE;

  constructor() {
    this.PORT = process.env.PORT || "3000";
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5175";

    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || "1234567891";
    this.JWT_TOKEN = process.env.JWT_TOKEN || "1234567891";
    this.SECRET_KEY_1 = process.env.SECRET_KEY_1 || "1234567891";
    this.SECRET_KEY_2 = process.env.SECRET_KEY_2 || "1234567891";

    this.AUTH_BASE_URL = process.env.AUTH_BASE_URL || "http://localhost:4002";
  }
}

export const config = new Config();

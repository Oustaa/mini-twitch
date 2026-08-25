import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "../../../utils/axios";

class AuthService {
  async login(body: unknown) {
    const response: AxiosResponse = await axiosAuthInstance.post(
      "api/v1/login",
      body,
    );

    return response;
  }

  async signup(body: unknown) {
    const response: AxiosResponse = await axiosAuthInstance.post(
      "api/v1/signup",
      body,
    );

    return response;
  }

  async logout() {
    const response: AxiosResponse =
      await axiosAuthInstance.post("api/v1/logout");

    return response;
  }

  async verify() {
    const response: AxiosResponse =
      await axiosAuthInstance.post("api/v1/verify");

    return response;
  }
}

export const authService: AuthService = new AuthService();

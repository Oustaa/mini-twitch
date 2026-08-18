import axios, { AxiosResponse } from "axios";
import { AxiosService } from "../utils/axios";
import { config } from "../config";

export let axiosAuthInstance: ReturnType<typeof axios.create>;

class AuthService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(
      `${config.AUTH_BASE_URL}`,
      "auth",
    );

    axiosAuthInstance = axiosService.axios;
  }

  async login(body: unknown) {
    const response: AxiosResponse = await axiosAuthInstance.post("login", body);

    return response;
  }

  async signin(body: unknown) {
    const response: AxiosResponse = await axiosAuthInstance.post(
      "singin",
      body,
    );

    return response;
  }

  async logout() {
    const response: AxiosResponse = await axiosAuthInstance.post("logout");

    return response;
  }

  async verify() {
    const response: AxiosResponse = await axiosAuthInstance.post("verify");

    return response;
  }
}

export const authService: AuthService = new AuthService();

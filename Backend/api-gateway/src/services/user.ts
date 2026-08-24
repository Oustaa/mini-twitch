import axios, { AxiosResponse } from "axios";
import { AxiosService } from "../utils/axios";
import { config } from "../config";

export let axiosAuthInstance: ReturnType<typeof axios.create>;

class UserService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(
      `${config.AUTH_BASE_URL}`,
      "auth",
    );

    axiosAuthInstance = axiosService.axios;
  }

  async verifyUsername(username?: string) {
    const response: AxiosResponse = await axiosAuthInstance.post(
      `verify-username?username=${username}`,
    );

    return response;
  }
}

export const userService: UserService = new UserService();

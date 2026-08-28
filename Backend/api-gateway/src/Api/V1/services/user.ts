import { AxiosResponse } from "axios";
import { axiosAuthInstance } from "../../../utils/axios";

class UserService {
  constructor() {}

  async verifyUsername(username?: string) {
    const response: AxiosResponse = await axiosAuthInstance.get(
      `api/v1/verify-username?username=${username}`,
    );

    return response;
  }

  async getUsernameSuggestions(query?: string) {
    const response: AxiosResponse = await axiosAuthInstance.get(
      `api/v1/get-username-suggestions?query=${query}`,
    );

    return response;
  }
}

export const userService: UserService = new UserService();

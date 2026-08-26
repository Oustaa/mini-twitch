import { api } from "@/utils/ApiInstance";
import axios from "axios";

export function getValidateUsername(): (username: string) => Promise<unknown> {
  let controller: AbortController | null = null;

  return async (username: string) => {
    controller?.abort();
    controller = new AbortController();

    try {
      const response = await api.get("/user/verify-username", {
        signal: controller.signal,
        params: { username },
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", (error as Error).message);
        return;
      }
      throw error;
    }
  };
}

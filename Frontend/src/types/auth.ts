import type { ID } from "./global";

export interface AuthUser {
  id: ID;
  username: string;
  email: string;
  phone: string;
  is_streamer: boolean;
  avatar: string;
  followe_count: number;
  description: string;
}

import { Request } from "express";
import TokenBucket from "./TokenBucket";

export type LimitWindow = "Seconds" | "Minutes" | "Hours" | "Days";
type LimitBy = "User" | "IP";

const LimitWindowToSec: Record<LimitWindow, number> = {
  Days: 86400,
  Hours: 3600,
  Minutes: 60,
  Seconds: 1,
};

class RateLimiter {
  private bucket = new Map<string, TokenBucket>();
  private readonly limitBy: LimitBy = "IP";

  private readonly limit: number;
  private readonly refillRatePerMs: number;

  constructor(window: LimitWindow, limit: number, windowCount: number = 1) {
    this.limit = limit;

    const windowMs = LimitWindowToSec[window] * 1000 * windowCount;
    this.refillRatePerMs = limit / windowMs;
  }

  check(request: Request): boolean {
    const key = this.getKey(request);

    const bucketObj = this.bucket.get(key);

    if (!bucketObj) {
      const newBucket = new TokenBucket(this.limit, this.refillRatePerMs);
      this.bucket.set(key, newBucket);
      return newBucket.consume();
    } else {
      return bucketObj.consume();
    }
  }

  getKey(request: Request): string {
    if (this.limitBy === "IP") {
      return request.ip as string;
    } else {
      // should decrept the JWT Tocken to get the user id, and return it
      return "";
    }
  }
}

export default RateLimiter;

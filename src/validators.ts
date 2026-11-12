import { config } from "./config.ts";
import { InvalidTimeoutError, MissingApiKeyError } from "./errors.ts";

export function validateApiKey(value: string | undefined | null): string;
export function validateApiKey(
  value: string | undefined | null,
  allowNull: boolean,
): string | undefined;
export function validateApiKey(
  value: string | undefined | null,
  allowNull = false,
): string | undefined {
  // `api_key` can be null to support unmetered queries.
  if (allowNull && value === null) {
    return undefined;
  }
  const key = value ?? config.api_key;
  if (!key) throw new MissingApiKeyError();
  return key;
}

const MAX_TIMEOUT = 2147483647; // i chose this value because it is 2^32 - 1 ,largest number a signed 32-bit integer can hold

export function validateTimeout(value: number | undefined): number {
  const timeout = value ?? config.timeout;

  if (!(timeout > 0)) throw new InvalidTimeoutError();
  return Math.min(timeout, MAX_TIMEOUT);
}

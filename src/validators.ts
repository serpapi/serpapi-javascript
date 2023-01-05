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

export function validateTimeout(value: number | undefined): number {
  const timeout = value ?? config.timeout;
  if (timeout <= 0) throw new InvalidTimeoutError();
  return timeout;
}

export class MissingApiKeyError extends Error {
  constructor() {
    super("apiKey is required, get it from: https://serpapi.com/dashboard");
    Object.setPrototypeOf(this, MissingApiKeyError.prototype);
  }
}

export class InvalidTimeoutError extends Error {
  constructor() {
    super("Enter a valid timeout in milliseconds");
    Object.setPrototypeOf(this, InvalidTimeoutError.prototype);
  }
}

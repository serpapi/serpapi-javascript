export class InvalidArgumentError extends Error {
  constructor() {
    super("Arguments are missing or of incorrect type");
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}

export class MissingApiKeyError extends Error {
  constructor() {
    super(
      "api_key is required, get it from: https://serpapi.com/manage-api-key",
    );
    Object.setPrototypeOf(this, MissingApiKeyError.prototype);
  }
}

export class InvalidTimeoutError extends Error {
  constructor() {
    super("Enter a valid timeout in milliseconds");
    Object.setPrototypeOf(this, InvalidTimeoutError.prototype);
  }
}

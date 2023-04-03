export class InvalidArgumentTypesError extends Error {
  constructor() {
    super("Provide the arguments with the correct type");
    Object.setPrototypeOf(this, InvalidArgumentTypesError.prototype);
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

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

export class RequestTimeoutError extends Error {
  constructor() {
    super("The request was timed out");
    Object.setPrototypeOf(this, RequestTimeoutError.prototype);
  }
}

/**
 * Error raised when SerpApi responds with a non-200 status code.
 *
 * @property {number} statusCode HTTP status code of the response.
 * @property {string} body Raw response body.
 * @example
 * try {
 *   const json = await getJson({ engine: "google", api_key: API_KEY, q: "coffee" });
 * } catch (error) {
 *   if (error instanceof HTTPError) {
 *     console.log(error.statusCode, error.body);
 *   }
 * }
 */
export class HTTPError extends Error {
  readonly statusCode: number | undefined;
  readonly body: string;

  constructor(statusCode: number | undefined, body: string) {
    let message = `Request failed with status code ${statusCode}`;
    try {
      const parsed = JSON.parse(body) as { error?: string };
      if (
        parsed && typeof parsed.error === "string" && parsed.error.length > 0
      ) {
        message = parsed.error;
      }
    } catch {
      // The body is not JSON. Fall back to the status code message.
    }
    super(message);
    this.statusCode = statusCode;
    this.body = body;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

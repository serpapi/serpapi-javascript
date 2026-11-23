import https from "node:https";
import { EventEmitter } from "node:events";
import { afterEach, it } from "@std/testing/bdd";
import { assertRejects } from "@std/testing/asserts";
import { stub } from "@std/testing/mock";
import { execute } from "../src/utils.ts";

const originalGet = https.get;

afterEach(() => {
  https.get = originalGet;
});

it("rejects promptly when the response closes before completion", async () => {
  const response = new EventEmitter() as EventEmitter & {
    statusCode: number;
    complete: boolean;
    setEncoding: (encoding: string) => void;
  };

  response.statusCode = 200;
  response.complete = false;
  response.setEncoding = () => {};

  const request = new EventEmitter() as EventEmitter & {
    destroy: () => void;
  };

  request.destroy = () => {};

  const getStub = stub(
    https,
    "get",
    ((_options, callback) => {
      queueMicrotask(() => {
        if (typeof callback !== "function") {
          throw new Error("Expected HTTPS response callback");
        }
        callback(response as unknown as import("node:http").IncomingMessage);
        response.emit("data", '{"partial":');
        response.emit("close");
      });

      return request;
    }) as typeof https.get,
  );

  try {
    const result = execute("/search", { q: "test" }, 1000);

    await assertRejects(
      () => result,
      Error,
      "Response closed before completion",
    );
  } finally {
    getStub.restore();
  }
});

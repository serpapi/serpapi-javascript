import https from "node:https";
import type { ClientRequest, IncomingMessage } from "node:http";
import { EventEmitter } from "node:events";
import { it } from "@std/testing/bdd";
import { assertRejects } from "@std/testing/asserts";
import { stub } from "@std/testing/mock";
import { uploadImage } from "../src/utils.ts";

it("rejects when an upload response closes before completion", async () => {
  const response = new EventEmitter() as EventEmitter & {
    statusCode: number;
    complete: boolean;
    setEncoding: (encoding: string) => void;
  };

  response.statusCode = 200;
  response.complete = false;
  response.setEncoding = () => {};

  const request = new EventEmitter() as EventEmitter & {
    end: (data?: Uint8Array) => void;
    destroy: () => void;
  };

  request.end = () => {};
  request.destroy = () => {};

  const requestStub = stub(
    https,
    "request",
    ((_options, callback) => {
      queueMicrotask(() => {
        if (typeof callback !== "function") {
          throw new Error("Expected HTTPS response callback");
        }

        callback(response as unknown as IncomingMessage);
        response.emit("data", '{"partial":');
        response.emit("close");
      });

      return request as unknown as ClientRequest;
    }) as typeof https.request,
  );

  try {
    await assertRejects(
      () =>
        uploadImage(new Uint8Array([1, 2, 3]), {
          api_key: "test-key",
        }, 1000),
      Error,
      "Response closed before completion",
    );
  } finally {
    requestStub.restore();
  }
});

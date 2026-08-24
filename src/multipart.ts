import { Buffer } from "node:buffer";
import { randomBytes } from "node:crypto";

/**
 * Multipart body construction adapted from the `form-data` project:
 * https://github.com/form-data/form-data/blob/v4.0.6/lib/form_data.js
 *
 * In particular, this follows its header parameter escaping, boundary
 * generation, CRLF placement, and buffer concatenation approach.
 *
 * Copyright (c) 2012 Felix Geisendörfer (felix@debuggable.com) and contributors
 * Licensed under the MIT License:
 * https://github.com/form-data/form-data/blob/v4.0.6/License
 */

const CRLF = "\r\n";

type MultipartPart = {
  name: string;
  value: string | Uint8Array;
  filename?: string;
  contentType?: string;
};

export type MultipartBody = {
  body: Buffer;
  contentType: string;
};

/** Escape multipart header parameters according to the WHATWG encoding. */
function escapeHeaderParameter(value: string): string {
  return value
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .replace(/"/g, "%22");
}

function asBuffer(value: string | Uint8Array): Buffer {
  if (typeof value === "string") return Buffer.from(value, "utf8");
  return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
}

export function createMultipartBody(parts: MultipartPart[]): MultipartBody {
  // Same boundary shape used by form-data: 26 hyphens and 24 random hex chars.
  const boundary = `--------------------------${
    randomBytes(12).toString("hex")
  }`;
  const buffers: Buffer[] = [];

  for (const part of parts) {
    let header = `--${boundary}${CRLF}` +
      `Content-Disposition: form-data; name="${
        escapeHeaderParameter(part.name)
      }"`;

    if (part.filename) {
      header += `; filename="${escapeHeaderParameter(part.filename)}"`;
    }
    header += CRLF;

    if (part.contentType) {
      header += `Content-Type: ${part.contentType}${CRLF}`;
    }

    buffers.push(
      Buffer.from(`${header}${CRLF}`, "utf8"),
      asBuffer(part.value),
      Buffer.from(CRLF, "utf8"),
    );
  }

  buffers.push(Buffer.from(`--${boundary}--${CRLF}`, "utf8"));

  return {
    body: Buffer.concat(buffers),
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
}

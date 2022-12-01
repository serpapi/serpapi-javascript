const IS_TEST_ENV = Deno.env.get("ENV_TYPE") === "test";
export const BASE_URL = IS_TEST_ENV
  ? "http://localhost:3000"
  : "https://serpapi.com";

type UrlParameters = Record<
  string,
  string | number | boolean | undefined | null
>;

export function buildUrl<P extends UrlParameters>(
  path: string,
  parameters: P,
): string {
  const nonUndefinedParams = Object.entries(parameters)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => [key, `${value}`]);
  const searchParams = new URLSearchParams(nonUndefinedParams);
  return `${BASE_URL}${path}?${searchParams}`;
}

export async function execute<P extends UrlParameters>(
  path: string,
  parameters: P,
  timeout: number,
): Promise<Response> {
  const url = buildUrl(path, {
    ...parameters,
    source: "nodejs", // TODO(seb): add version of node/deno + library version
  });
  return await fetch(url, { signal: AbortSignal.timeout(timeout) });
}

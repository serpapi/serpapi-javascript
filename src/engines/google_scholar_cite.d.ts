import type { BaseParameters } from "../types.d.ts";

export type GoogleScholarCiteParameters = BaseParameters & {
  /**
   * Search Result ID
   * Parameter defines the ID of an individual Google Scholar organic search result.
   * You can find the ID inside the `result_id` by using our [Google Scholar
   * API](https://serpapi.com/google-scholar-api).
   */
  q: string;
};

import type { BaseParameters } from "../types.d.ts";

export type GoogleAboutThisResultParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the URL of a website which results you what to show. Value
   * should be formated in the next order: `About URL` (e.g. `About
   * https://www.starbucks.com/`)
   */
  q: string;

  /**
   * Domain
   * Parameter defines the Google domain to use. It defaults to `google.com`. Head to
   * the [Google domains page](https://serpapi.com/google-domains) for a full list of
   * supported Google domains.
   */
  google_domain?: string;

  /**
   * Result ID
   * Parameter defines unique ID of a website which results you what to show.
   */
  ilps: string;
};

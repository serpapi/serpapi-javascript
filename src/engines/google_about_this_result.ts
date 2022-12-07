export type GoogleAboutThisResultParameters = {
  engine: "google_about_this_result";

  /**
   * Search Query
   * Parameter defines the URL of a website which results you what to show. Value
   * should be formated in the next order: `About URL` (e.g. `About
   * https://www.starbucks.com/`)
   */
  q: string;

  /**
   * Result ID
   * Parameter defines unique ID of a website which results you what to show.
   */
  ilps: string;
};

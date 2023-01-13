import type { BaseParameters } from "../types.ts";

export type GoogleJobsListingParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the `job_id` string which can be obtained from Google Jobs
   * API.
   */
  q: string;
};

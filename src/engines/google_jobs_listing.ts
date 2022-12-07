export type GoogleJobsListingParameters = {
  engine: "google_jobs_listing";

  /**
   * Search Query
   * Parameter defines the `job_id` string which can be obtained from Google Jobs
   * API.
   */
  q: string;
};

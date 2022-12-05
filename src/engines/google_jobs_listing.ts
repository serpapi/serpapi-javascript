import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleJobsListingParameters = {
  q: string;
};

export class GoogleJobsListing
  extends SearchEngine<GoogleJobsListingParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_jobs_listing", apiKey, timeout);
  }
}

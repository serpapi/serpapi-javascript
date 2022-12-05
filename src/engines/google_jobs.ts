import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleJobsParameters = {
  q: string;
  location?: string;
  uule?: string;
  google_domain?: string;
  gl?: string;
  hl?: string;
  start?: number;
  chips?: string;
  lrad?: string;
};

export class GoogleJobs
  extends SearchEngine<GoogleJobsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_jobs", apiKey, timeout);
  }
}

import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleScholarProfilesParameters = {
  mauthors: string;
  hl?: string;
  after_author?: string;
  before_author?: string;
};

export class GoogleScholarProfiles
  extends SearchEngine<GoogleScholarProfilesParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_scholar_profiles", apiKey, timeout);
  }
}

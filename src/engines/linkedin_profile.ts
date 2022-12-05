import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type LinkedinProfileParameters = {
  profile_id: string;
};

export class LinkedinProfile
  extends SearchEngine<LinkedinProfileParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("linkedin_profile", apiKey, timeout);
  }
}

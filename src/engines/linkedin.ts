import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type LinkedinParameters = {
  first_name: string;
  last_name?: string;
};

export class Linkedin
  extends SearchEngine<LinkedinParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("linkedin", apiKey, timeout);
  }
}

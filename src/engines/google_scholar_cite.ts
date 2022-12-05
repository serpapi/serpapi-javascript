import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleScholarCiteParameters = {
  q: string;
};

export class GoogleScholarCite
  extends SearchEngine<GoogleScholarCiteParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_scholar_cite", apiKey, timeout);
  }
}

import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleAboutThisResultParameters = {
  q: string;
  ilps: string;
};

export class GoogleAboutThisResult
  extends SearchEngine<GoogleAboutThisResultParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_about_this_result", apiKey, timeout);
  }
}

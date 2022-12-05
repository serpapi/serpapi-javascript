import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleTrendsAutocompleteParameters = {
  q: string;
  hl?: string;
};

export class GoogleTrendsAutocomplete
  extends SearchEngine<GoogleTrendsAutocompleteParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_trends_autocomplete", apiKey, timeout);
  }
}

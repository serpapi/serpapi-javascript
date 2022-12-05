import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleAutocompleteParameters = {
  q: string;
  gl?: string;
  hl?: string;
  cp?: string;
  client?: string;
};

export class GoogleAutocomplete
  extends SearchEngine<GoogleAutocompleteParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_autocomplete", apiKey, timeout);
  }
}

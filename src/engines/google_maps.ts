import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleMapsParameters = {
  q?: string;
  ll?: string;
  google_domain?: string;
  hl?: string;
  data?: string;
  type: string;
  start?: number;
};

export class GoogleMaps
  extends SearchEngine<GoogleMapsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_maps", apiKey, timeout);
  }
}

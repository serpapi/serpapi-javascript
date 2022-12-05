import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type DuckduckgoParameters = {
  q: string;
  kl?: string;
  safe?: string;
  df?: string;
  start?: number;
};

export class Duckduckgo
  extends SearchEngine<DuckduckgoParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("duckduckgo", apiKey, timeout);
  }
}

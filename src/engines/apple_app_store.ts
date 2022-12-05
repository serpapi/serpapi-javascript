import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type AppleAppStoreParameters = {
  term: string;
  country?: string;
  lang?: string;
  num?: string;
  page?: string;
  disallow_explicit?: boolean;
  property?: string;
};

export class AppleAppStore
  extends SearchEngine<AppleAppStoreParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("apple_app_store", apiKey, timeout);
  }
}

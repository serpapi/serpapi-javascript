import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleImmersiveProductParameters = {
  page_token: string;
};

export class GoogleImmersiveProduct
  extends SearchEngine<GoogleImmersiveProductParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_immersive_product", apiKey, timeout);
  }
}

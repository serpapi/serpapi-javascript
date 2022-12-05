import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type BingImagesParameters = {
  q: string;
  mkt?: string;
  cc?: string;
  first?: string;
  count?: string;
  imagesize?: string;
  color2?: string;
  photo?: string;
  aspect?: string;
  face?: string;
  age?: string;
  license?: string;
};

export class BingImages
  extends SearchEngine<BingImagesParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("bing_images", apiKey, timeout);
  }
}

import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YahooImagesParameters = {
  p: string;
  yahoo_domain?: string;
  imgsz?: string;
  imgc?: string;
  imgty?: string;
  imga?: string;
  imgf?: string;
  imgt?: string;
  imgl?: string;
  b?: string;
};

export class YahooImages
  extends SearchEngine<YahooImagesParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yahoo_images", apiKey, timeout);
  }
}

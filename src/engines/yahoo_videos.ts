import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YahooVideosParameters = {
  p: string;
  yahoo_domain?: string;
  durs?: string;
  vage?: string;
  vres?: string;
  vsite?: string;
  b?: string;
};

export class YahooVideos
  extends SearchEngine<YahooVideosParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yahoo_videos", apiKey, timeout);
  }
}

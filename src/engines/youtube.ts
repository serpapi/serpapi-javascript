import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YoutubeParameters = {
  search_query: string;
  gl?: string;
  hl?: string;
  sp?: string;
};

export class Youtube extends SearchEngine<YoutubeParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("youtube", apiKey, timeout);
  }
}

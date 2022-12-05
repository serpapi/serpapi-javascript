import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleScholarParameters = {
  q: string;
  cites?: string;
  as_ylo?: string;
  as_yhi?: string;
  scisbd?: string;
  cluster?: string;
  hl?: string;
  lr?: string;
  start?: number;
  num?: string;
  as_sdt?: string;
  safe?: string;
  filter?: string;
  as_vis?: string;
};

export class GoogleScholar
  extends SearchEngine<GoogleScholarParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_scholar", apiKey, timeout);
  }
}

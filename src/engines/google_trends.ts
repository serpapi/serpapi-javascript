import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleTrendsParameters = {
  q: string;
  geo?: string;
  region?: string;
  data_type?: string;
  tz?: string;
  cat?: string;
  gprop?: string;
  date?: string;
  csv?: string;
};

export class GoogleTrends
  extends SearchEngine<GoogleTrendsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_trends", apiKey, timeout);
  }
}

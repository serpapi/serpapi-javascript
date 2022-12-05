import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type NaverParameters = {
  query: string;
  start?: number;
  page?: string;
  num?: string;
  where?: string;
};

export class Naver extends SearchEngine<NaverParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("naver", apiKey, timeout);
  }
}

import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type BaiduParameters = {
  q: string;
  ct?: string;
  pn?: string;
  rn?: string;
  gpc?: string;
  q5?: string;
  q6?: string;
  bs?: string;
  oq?: string;
  f?: string;
};

export class Baidu extends SearchEngine<BaiduParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("baidu", apiKey, timeout);
  }
}

import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type BaiduNewsParameters = {
  q: string;
  ct?: string;
  pn?: string;
  rn?: string;
  rtt?: string;
  medium?: string;
};

export class BaiduNews
  extends SearchEngine<BaiduNewsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("baidu_news", apiKey, timeout);
  }
}

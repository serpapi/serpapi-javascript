import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleParameters = {
  q: string;
  location?: string;
  uule?: string;
  ludocid?: string;
  lsig?: string;
  google_domain?: string;
  gl?: string;
  hl?: string;
  lr?: string;
  as_dt?: string;
  as_epq?: string;
  as_eq?: string;
  as_lq?: string;
  as_nlo?: string;
  as_nhi?: string;
  as_oq?: string;
  as_q?: string;
  as_qdr?: string;
  as_rq?: string;
  as_sitesearch?: string;
  tbs?: string;
  safe?: string;
  nfpr?: string;
  filter?: string;
  tbm?: string;
  start?: number;
  num?: string;
  ijn?: string;
};

export class Google extends SearchEngine<GoogleParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google", apiKey, timeout);
  }
}

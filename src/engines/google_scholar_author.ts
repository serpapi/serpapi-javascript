import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleScholarAuthorParameters = {
  author_id: string;
  hl?: string;
  view_op?: string;
  sort?: string;
  citation_id?: string;
  start?: number;
  num?: string;
};

export class GoogleScholarAuthor
  extends SearchEngine<GoogleScholarAuthorParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_scholar_author", apiKey, timeout);
  }
}

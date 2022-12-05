import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GooglePlayParameters = {
  q?: string;
  gl?: string;
  hl?: string;
  store: string;
  apps_category?: string;
  movies_category?: string;
  books_category?: string;
  age?: string;
  price?: string;
  store_device?: string;
  chart?: string;
  see_more_token?: string;
  next_page_token?: string;
};

export class GooglePlay
  extends SearchEngine<GooglePlayParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_play", apiKey, timeout);
  }
}

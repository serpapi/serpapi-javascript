/** Parameters for the Google Search engine. */
export interface GoogleSearchParameters {
  engine: "google";
  q: string;
  api_key?: string;
  timeout?: number;

  // Geographic Location
  location?: string;
  uule?: string;
  lat?: number;
  lon?: number;
  radius?: number;

  // Localization
  google_domain?: string;
  gl?: string;
  hl?: string;
  cr?: string;
  lr?: string;

  // Search Type
  tbm?: "isch" | "lcl" | "vid" | "nws" | "shop" | "pts";

  // Pagination
  start?: number;
  num?: number;

  // Advanced Filters
  tbs?: string;
  safe?: "active" | "off";
  nfpr?: 0 | 1;
  filter?: 0 | 1;

  // Advanced Google Parameters
  ludocid?: string;
  lsig?: string;
  kgmid?: string;
  si?: string;

  // SerpApi Parameters
  device?: "desktop" | "tablet" | "mobile";
  no_cache?: boolean;
  async?: boolean;

  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}

/** Metadata returned with every SerpApi response. */
export interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_url: string;
  raw_html_file: string;
  total_time_taken: number;
}

/** Echoed search parameters in the response. */
export interface SearchParameters {
  engine: string;
  q: string;
  google_domain?: string;
  hl?: string;
  gl?: string;
  device?: string;
  location_requested?: string;
  location_used?: string;
  [key: string]: unknown;
}

/** Search result info. */
export interface SearchInformation {
  query_displayed: string;
  total_results: number;
  time_taken_displayed: number;
  organic_results_state: string;
  page_number?: number;
}

/** A single organic search result. */
export interface OrganicResult {
  position: number;
  title: string;
  link: string;
  redirect_link?: string;
  displayed_link: string;
  snippet: string;
  snippet_highlighted_words?: string[];
  date?: string;
  sitelinks?: {
    inline?: { title: string; link: string }[];
    expanded?: { title: string; link: string; snippet: string }[];
  };
  rich_snippet?: Record<string, unknown>;
  source?: string;
}

/** Knowledge graph result. */
export interface KnowledgeGraph {
  title?: string;
  type?: string;
  description?: string;
  source?: { name: string; link: string };
  [key: string]: unknown;
}

/** "People also ask" question. */
export interface RelatedQuestion {
  question: string;
  snippet?: string;
  title?: string;
  link?: string;
}

/** Google Search JSON response. */
export interface GoogleSearchResponse {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  search_information?: SearchInformation;
  organic_results?: OrganicResult[];
  knowledge_graph?: KnowledgeGraph;
  related_questions?: RelatedQuestion[];
  pagination?: {
    current: number;
    next?: string;
    other_pages?: Record<string, string>;
  };
  [key: string]: unknown;
}

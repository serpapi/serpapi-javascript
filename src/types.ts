// deno-lint-ignore no-explicit-any
export type EngineParameters = Record<string, any>;

// deno-lint-ignore no-explicit-any
export type BaseResponse = Record<string, any>;

export type {
  GoogleSearchParameters,
  GoogleSearchResponse,
  OrganicResult,
  KnowledgeGraph,
  RelatedQuestion,
  SearchInformation,
  SearchMetadata,
  SearchParameters,
} from "./engines/google.ts";

export type GetBySearchIdParameters = {
  api_key?: string;
  timeout?: number;
};

export type AccountApiParameters = {
  api_key?: string;
  timeout?: number;
};
export type LocationsApiParameters = {
  q?: string;
  limit?: number;
  timeout?: number;
};

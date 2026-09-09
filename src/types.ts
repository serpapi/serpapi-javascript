import type http from "node:http";

// Keep this list at the engine-name level. Per-engine parameter schemas are
// intentionally out of scope for this minimal TypeScript coverage layer.
export type EngineName =
  | "amazon"
  | "amazon_product"
  | "apple_maps"
  | "apple_maps_places"
  | "baidu"
  | "baidu_news"
  | "bing"
  | "bing_copilot"
  | "bing_images"
  | "bing_maps"
  | "bing_news"
  | "bing_product"
  | "bing_reverse_image"
  | "bing_shopping"
  | "bing_videos"
  | "brave_ai_mode"
  | "duckduckgo"
  | "duckduckgo_light"
  | "duckduckgo_maps"
  | "duckduckgo_news"
  | "ebay"
  | "ebay_product"
  | "facebook_profile"
  | "google"
  | "google_about_this_result"
  | "google_ads"
  | "google_ads_transparency_center"
  | "google_ads_transparency_center_ad_details"
  | "google_ai_mode"
  | "google_ai_overview"
  | "google_autocomplete"
  | "google_events"
  | "google_finance"
  | "google_finance_markets"
  | "google_flights"
  | "google_flights_autocomplete"
  | "google_flights_deals"
  | "google_forums"
  | "google_hotels"
  | "google_hotels_autocomplete"
  | "google_hotels_photos"
  | "google_hotels_reviews"
  | "google_images"
  | "google_images_light"
  | "google_images_related_content"
  | "google_immersive_product"
  | "google_jobs"
  | "google_jobs_listing"
  | "google_lens"
  | "google_light"
  | "google_local"
  | "google_local_services"
  | "google_maps"
  | "google_maps_autocomplete"
  | "google_maps_contributor_reviews"
  | "google_maps_directions"
  | "google_maps_photo_meta"
  | "google_maps_photos"
  | "google_maps_posts"
  | "google_maps_reviews"
  | "google_news"
  | "google_news_light"
  | "google_patents"
  | "google_patents_details"
  | "google_play"
  | "google_play_product"
  | "google_related_questions"
  | "google_scholar"
  | "google_scholar_author"
  | "google_scholar_case_law"
  | "google_scholar_cite"
  | "google_scholar_profiles"
  | "google_shopping"
  | "google_shopping_filters"
  | "google_shopping_light"
  | "google_short_videos"
  | "google_travel_explore"
  | "google_trends"
  | "google_videos"
  | "google_videos_light"
  | "home_depot"
  | "home_depot_product"
  | "instagram_profile"
  | "naver"
  | "naver_ai_overview"
  | "open_table_reviews"
  | "tripadvisor"
  | "tripadvisor_place"
  | "tripadvisor_reviews"
  | "walmart"
  | "walmart_product"
  | "walmart_product_reviews"
  | "walmart_product_sellers"
  | "yahoo"
  | "yahoo_images"
  | "yahoo_shopping"
  | "yahoo_videos"
  | "yandex"
  | "yandex_images"
  | "yandex_videos"
  | "yelp"
  | "yelp_place"
  | "yelp_reviews"
  | "youtube"
  | "youtube_video"
  | "youtube_video_transcript";

type BaseParameters = {
  api_key?: string | null;
  async?: boolean;
  device?: "desktop" | "tablet" | "mobile";
  no_cache?: boolean;
  output?: "json" | "html";
  q?: string;
  requestOptions?: http.RequestOptions;
  timeout?: number;
  zero_trace?: boolean;
};

export type EngineParameters<EngineRequired = true> =
  & (EngineRequired extends true ? { engine: EngineName }
    : { engine?: EngineName })
  & BaseParameters
  & Record<string, unknown>;

// deno-lint-ignore no-explicit-any
export type BaseResponse = Record<string, any>;

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

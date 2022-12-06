import type { GoogleParameters } from "./engines/google.ts";
import type { GoogleJobsParameters } from "./engines/google_jobs.ts";
import type { GoogleJobsListingParameters } from "./engines/google_jobs_listing.ts";
import type { GoogleReverseImageParameters } from "./engines/google_reverse_image.ts";
import type { GoogleScholarProfilesParameters } from "./engines/google_scholar_profiles.ts";
import type { GoogleScholarParameters } from "./engines/google_scholar.ts";
import type { GoogleScholarCiteParameters } from "./engines/google_scholar_cite.ts";
import type { GoogleScholarAuthorParameters } from "./engines/google_scholar_author.ts";
import type { GoogleProductParameters } from "./engines/google_product.ts";
import type { GoogleMapsParameters } from "./engines/google_maps.ts";
import type { GoogleMapsPhotosParameters } from "./engines/google_maps_photos.ts";
import type { GoogleMapsReviewsParameters } from "./engines/google_maps_reviews.ts";
import type { GoogleEventsParameters } from "./engines/google_events.ts";
import type { GoogleAutocompleteParameters } from "./engines/google_autocomplete.ts";
import type { GoogleRelatedQuestionsParameters } from "./engines/google_related_questions.ts";
import type { GoogleTrendsParameters } from "./engines/google_trends.ts";
import type { GoogleTrendsAutocompleteParameters } from "./engines/google_trends_autocomplete.ts";
import type { GoogleFinanceMarketsParameters } from "./engines/google_finance_markets.ts";
import type { GoogleImmersiveProductParameters } from "./engines/google_immersive_product.ts";
import type { BingParameters } from "./engines/bing.ts";
import type { BingNewsParameters } from "./engines/bing_news.ts";
import type { BingImagesParameters } from "./engines/bing_images.ts";
import type { BaiduParameters } from "./engines/baidu.ts";
import type { BaiduNewsParameters } from "./engines/baidu_news.ts";
import type { YahooParameters } from "./engines/yahoo.ts";
import type { YahooImagesParameters } from "./engines/yahoo_images.ts";
import type { YahooVideosParameters } from "./engines/yahoo_videos.ts";
import type { YahooShoppingParameters } from "./engines/yahoo_shopping.ts";
import type { EbayParameters } from "./engines/ebay.ts";
import type { YandexParameters } from "./engines/yandex.ts";
import type { YandexImagesParameters } from "./engines/yandex_images.ts";
import type { YandexVideosParameters } from "./engines/yandex_videos.ts";
import type { YoutubeParameters } from "./engines/youtube.ts";
import type { WalmartParameters } from "./engines/walmart.ts";
import type { WalmartProductParameters } from "./engines/walmart_product.ts";
import type { WalmartProductReviewsParameters } from "./engines/walmart_product_reviews.ts";
import type { HomeDepotParameters } from "./engines/home_depot.ts";
import type { HomeDepotProductParameters } from "./engines/home_depot_product.ts";
import type { LinkedinParameters } from "./engines/linkedin.ts";
import type { LinkedinProfileParameters } from "./engines/linkedin_profile.ts";
import type { DuckduckgoParameters } from "./engines/duckduckgo.ts";
import type { GooglePlayProductParameters } from "./engines/google_play_product.ts";
import type { GooglePlayParameters } from "./engines/google_play.ts";
import type { AppleAppStoreParameters } from "./engines/apple_app_store.ts";
import type { AppleReviewsParameters } from "./engines/apple_reviews.ts";
import type { AppleProductParameters } from "./engines/apple_product.ts";
import type { NaverParameters } from "./engines/naver.ts";
import type { GoogleLocalServicesParameters } from "./engines/google_local_services.ts";
import type { GoogleAboutThisResultParameters } from "./engines/google_about_this_result.ts";
import type { YelpParameters } from "./engines/yelp.ts";
import type { YelpReviewsParameters } from "./engines/yelp_reviews.ts";

export const engines = [
  "google",
  "google_jobs",
  "google_jobs_listing",
  "google_reverse_image",
  "google_scholar_profiles",
  "google_scholar",
  "google_scholar_cite",
  "google_scholar_author",
  "google_product",
  "google_maps",
  "google_maps_photos",
  "google_maps_reviews",
  "google_events",
  "google_autocomplete",
  "google_related_questions",
  "google_trends",
  "google_trends_autocomplete",
  "google_finance_markets",
  "google_immersive_product",
  "bing",
  "bing_news",
  "bing_images",
  "baidu",
  "baidu_news",
  "yahoo",
  "yahoo_images",
  "yahoo_videos",
  "yahoo_shopping",
  "ebay",
  "yandex",
  "yandex_images",
  "yandex_videos",
  "youtube",
  "walmart",
  "walmart_product",
  "walmart_product_reviews",
  "home_depot",
  "home_depot_product",
  "linkedin",
  "linkedin_profile",
  "duckduckgo",
  "google_play_product",
  "google_play",
  "apple_app_store",
  "apple_reviews",
  "apple_product",
  "naver",
  "google_local_services",
  "google_about_this_result",
  "yelp",
  "yelp_reviews",
] as const;
export type Engine = typeof engines[number];

export type EngineParameters =
  | GoogleParameters
  | GoogleJobsParameters
  | GoogleJobsListingParameters
  | GoogleReverseImageParameters
  | GoogleScholarProfilesParameters
  | GoogleScholarParameters
  | GoogleScholarCiteParameters
  | GoogleScholarAuthorParameters
  | GoogleProductParameters
  | GoogleMapsParameters
  | GoogleMapsPhotosParameters
  | GoogleMapsReviewsParameters
  | GoogleEventsParameters
  | GoogleAutocompleteParameters
  | GoogleRelatedQuestionsParameters
  | GoogleTrendsParameters
  | GoogleTrendsAutocompleteParameters
  | GoogleFinanceMarketsParameters
  | GoogleImmersiveProductParameters
  | BingParameters
  | BingNewsParameters
  | BingImagesParameters
  | BaiduParameters
  | BaiduNewsParameters
  | YahooParameters
  | YahooImagesParameters
  | YahooVideosParameters
  | YahooShoppingParameters
  | EbayParameters
  | YandexParameters
  | YandexImagesParameters
  | YandexVideosParameters
  | YoutubeParameters
  | WalmartParameters
  | WalmartProductParameters
  | WalmartProductReviewsParameters
  | HomeDepotParameters
  | HomeDepotProductParameters
  | LinkedinParameters
  | LinkedinProfileParameters
  | DuckduckgoParameters
  | GooglePlayProductParameters
  | GooglePlayParameters
  | AppleAppStoreParameters
  | AppleReviewsParameters
  | AppleProductParameters
  | NaverParameters
  | GoogleLocalServicesParameters
  | GoogleAboutThisResultParameters
  | YelpParameters
  | YelpReviewsParameters;

export type BaseParameters = {
  engine: string;
  device?: "desktop" | "tablet" | "mobile";
  no_cache?: boolean;
  async?: boolean;
  api_key?: string;
  timeout?: number;
};
export type BaseResponse<P extends BaseParameters = BaseParameters> = {
  search_metadata: {
    id: string;
    status: "Queued" | "Processing" | "Success";
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters: Omit<P, "api_key" | "no_cache" | "async" | "timeout">;
};

export type SearchParameters = BaseParameters & EngineParameters;

export type GetBySearchIdParameters = {
  id: string;
  api_key?: string;
  timeout?: number;
};

export type AccountApiParams = {
  api_key?: string;
  timeout?: number;
};
export type AccountInformation = {
  account_email: string;
  account_id: string;
  account_rate_limit_per_hour: number;
  api_key: string;
  extra_credits: number;
  last_hour_searches: number;
  plan_id: string;
  plan_name: string;
  plan_searches_left: number;
  searches_per_month: number;
  this_hour_searches: number;
  this_month_usage: number;
  total_searches_left: number;
};

export type LocationsApiParams = {
  q?: string;
  limit?: number;
  timeout?: number;
};
export type Location = {
  canonical_name: string;
  country_code: string;
  google_id: number;
  google_parent_id: number;
  gps: [number, number];
  id: string;
  keys: string[];
  name: string;
  reach: number;
  target_type: string;
};
export type Locations = Location[];

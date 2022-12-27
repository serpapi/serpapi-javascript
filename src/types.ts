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
import type { GoogleLensParameters } from "./engines/google_lens.ts";
import type { GoogleLocalServicesParameters } from "./engines/google_local_services.ts";
import type { GoogleAboutThisResultParameters } from "./engines/google_about_this_result.ts";
import type { YelpParameters } from "./engines/yelp.ts";
import type { YelpReviewsParameters } from "./engines/yelp_reviews.ts";

export type EngineMap = {
  google: { parameters: GoogleParameters };
  google_jobs: { parameters: GoogleJobsParameters };
  google_jobs_listing: { parameters: GoogleJobsListingParameters };
  google_reverse_image: { parameters: GoogleReverseImageParameters };
  google_scholar_profiles: { parameters: GoogleScholarProfilesParameters };
  google_scholar: { parameters: GoogleScholarParameters };
  google_scholar_cite: { parameters: GoogleScholarCiteParameters };
  google_scholar_author: { parameters: GoogleScholarAuthorParameters };
  google_product: { parameters: GoogleProductParameters };
  google_maps: { parameters: GoogleMapsParameters };
  google_maps_photos: { parameters: GoogleMapsPhotosParameters };
  google_maps_reviews: { parameters: GoogleMapsReviewsParameters };
  google_events: { parameters: GoogleEventsParameters };
  google_autocomplete: { parameters: GoogleAutocompleteParameters };
  google_related_questions: { parameters: GoogleRelatedQuestionsParameters };
  google_trends: { parameters: GoogleTrendsParameters };
  google_trends_autocomplete: {
    parameters: GoogleTrendsAutocompleteParameters;
  };
  google_finance_markets: { parameters: GoogleFinanceMarketsParameters };
  google_immersive_product: { parameters: GoogleImmersiveProductParameters };
  bing: { parameters: BingParameters };
  bing_news: { parameters: BingNewsParameters };
  bing_images: { parameters: BingImagesParameters };
  baidu: { parameters: BaiduParameters };
  baidu_news: { parameters: BaiduNewsParameters };
  yahoo: { parameters: YahooParameters };
  yahoo_images: { parameters: YahooImagesParameters };
  yahoo_videos: { parameters: YahooVideosParameters };
  yahoo_shopping: { parameters: YahooShoppingParameters };
  ebay: { parameters: EbayParameters };
  yandex: { parameters: YandexParameters };
  yandex_images: { parameters: YandexImagesParameters };
  yandex_videos: { parameters: YandexVideosParameters };
  youtube: { parameters: YoutubeParameters };
  walmart: { parameters: WalmartParameters };
  walmart_product: { parameters: WalmartProductParameters };
  walmart_product_reviews: { parameters: WalmartProductReviewsParameters };
  home_depot: { parameters: HomeDepotParameters };
  home_depot_product: { parameters: HomeDepotProductParameters };
  linkedin: { parameters: LinkedinParameters };
  linkedin_profile: { parameters: LinkedinProfileParameters };
  duckduckgo: { parameters: DuckduckgoParameters };
  google_play_product: { parameters: GooglePlayProductParameters };
  google_play: { parameters: GooglePlayParameters };
  apple_app_store: { parameters: AppleAppStoreParameters };
  apple_reviews: { parameters: AppleReviewsParameters };
  apple_product: { parameters: AppleProductParameters };
  naver: { parameters: NaverParameters };
  google_lens: { parameters: GoogleLensParameters };
  google_local_services: { parameters: GoogleLocalServicesParameters };
  google_about_this_result: { parameters: GoogleAboutThisResultParameters };
  yelp: { parameters: YelpParameters };
  yelp_reviews: { parameters: YelpReviewsParameters };
};

export type BaseParameters = {
  device?: "desktop" | "tablet" | "mobile";
  no_cache?: boolean;
  async?: boolean;
  api_key?: string | null;
  timeout?: number;
};
export type BaseResponse<P = Record<string | number | symbol, never>> = {
  search_metadata: {
    id: string;
    status: "Queued" | "Processing" | "Success";
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters:
    & { engine: string }
    & Omit<BaseParameters & P, "api_key" | "no_cache" | "async" | "timeout">;
  // deno-lint-ignore no-explicit-any
  [key: string]: any; // TODO(seb): use recursive type
};

export type GetBySearchIdParameters = {
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

export type YelpReviewsParameters = {
  engine: "yelp_reviews";
  place_id: string;
  yelp_domain?: string;
  hl?: string;
  q?: string;
  sortby?: string;
  start?: number;
};

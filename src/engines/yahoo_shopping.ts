export type YahooShoppingParameters = {
  engine: "yahoo_shopping";
  p: string;
  min_price?: string;
  max_price?: string;
  sort_by?: string;
  order_by?: string;
  category_attr_values?: string;
  merchants?: string;
  start?: number;
  limit?: number;
  page?: string;
};

export type YahooShoppingParameters = {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Yahoo! shopping search.
   */
  p: string;

  /**
   * Min Price
   * Lower bound of price range query.
   */
  min_price?: string;

  /**
   * Max Price
   * Upper bound of price range query.
   */
  max_price?: string;

  /**
   * Sort By
   * Parameter is used for sorting and refining results. Available options:
   * `price` - the costliest items first.
   * `relevancy` - the most relevant items first.
   * `popularity` - the most popular items first.
   * `discountPercentage` - the highest discounted items (by percentage) first.
   */
  sort_by?: string;

  /**
   * Order By
   * Parameter used to sort the query results in a top to bottom style or vice-versa.
   * Available options: `ASC` and `DESC`.
   */
  order_by?: string;

  /**
   * Gender and Age Range
   * Gender and Age Range filters on Yahoo! Shopping Search separated by comma (`,`).
   * (e.g. `gender_female,age_adult` is 'female' and 'adult', etc.). Can be obtained
   * from `filters.gender` and `filters.age-range` in API response.
   */
  category_attr_values?: string;

  /**
   * Merchants
   * Merchants ID separated by comma (`,`). Merchant IDs can be obtained from
   * `filters.stores` in API response. (e.g. `3719d8d4-5edd-4817-998a-91f3229e7323,`
   * is 'Walmart', etc.)
   */
  merchants?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `1` (default) is the first page of results, `60` is
   * the 2nd page of results, `120` is the 3rd page of results, etc.).
   */
  start?: number;

  /**
   * Number of Results
   * Parameter defines the maximum number of results to return. (e.g., `10` (default)
   * returns 10 results, `40` returns 40 results, and `100` returns 100 results).
   */
  limit?: number;

  /**
   * Page number
   * The page parameter does the `start` parameter math for you! Just define the page
   * number you want. Pagination starts from 1.
   */
  page?: string;
};

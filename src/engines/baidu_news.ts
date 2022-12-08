export type BaiduNewsParameters = {
  /**
   * Search Query
   * Parameter defines the the search query, including all Baidu search operators.
   * (e.g., `inurl:`, `site:`, `intitle:`, etc.).
   */
  q: string;

  /**
   * Choose Language
   * Parameter defines which language to restrict results. Available options:
   * `1` - All Languages.
   * `2` - Simplified Chinese
   * `3` - Traditional Chinese.
   */
  ct?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `10` is
   * the 2nd page of results, `20` is the 3rd page of results, etc.).
   */
  pn?: string;

  /**
   * Number of Results
   * Parameter defines the maximum number of results to return, limited to 50. (e.g.,
   * `10` (default) returns 10 results, `30` returns 30 results, and `50` returns 50
   * results).
   */
  rn?: string;

  /**
   * Sort Type
   * Parameter defines the sort type for results. Available options:
   * `1` - Sort by attraction (default)
   * `4` - Sort by time
   */
  rtt?: string;

  /**
   * Medium Filtering
   * Parameter defines medium filtering for results. Available options:
   * `0` - No filtering
   * `1` - Show results from medium sites
   * `2` - Show results from Baijiahao (baijiahao.baidu.com)
   */
  medium?: string;
};

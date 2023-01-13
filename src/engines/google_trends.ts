import type { BaseParameters } from "../types.ts";

export type GoogleTrendsParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the query or queries you want to search. You can use anything
   * that you would use in a regular Google Trends search. The maximum number of
   * queries per search is `5` (this only applies to "Interest over time" and
   * "Compared breakdown by region" data_type, other types of data will only accept
   * `1` query per search).
   * When passing multiple queries you need to use a comma (`,`) to separate them
   * (e.g. `coffee,pizza,dark chocolate,/m/027lnzs,bread`).
   * Query can be a "Search term" (e.g. `World Cup`, `Eminem`, `iPhone`, etc.) or a
   * "Topic" (e.g. `/m/0663v`, `/m/027lnzs`, `/g/11mw8j71m4`, etc.). Queries that are
   * "Topics" are encoded. To retrieve these values you can use our [Google Trends
   * Autocomplete API](https://serpapi.com/google-trends-autocomplete).
   */
  q: string;

  /**
   * Location
   * Parameter defines the location from where you want the search to originate. It
   * defaults to `Worldwide` (activated when the value of geo parameter is not set or
   * empty). Head to the [Google Trends
   * Locations](https://serpapi.com/google-trends-locations) for a full list of
   * supported Google Trends locations.
   */
  geo?: string;

  /**
   * Region
   * Parameter is used for getting more specific results when using "Compared
   * breakdown by region" and "Interest by region" data_type charts. Other data_type
   * charts do not accept region parameter. The default value depends on the geo
   * location that is set. Available options:
   * `COUNTRY` - Country
   * `REGION` - Subregion
   * `DMA` - Metro
   * `CITY` - City
   * Not all region options will return results for every geo location.
   */
  region?: string;

  /**
   * Data type
   * Parameter defines the type of search you want to do. Available options:
   * `TIMESERIES` - [Interest over
   * time](https://serpapi.com/google-trends-interest-over-time) (default) - Accepts
   * both single and multiple queries per search.
   * `GEO_MAP` - [Compared breakdown by
   * region](https://serpapi.com/google-trends-compared-breakdown) - Accepts only
   * multiple queries per search.
   * `GEO_MAP_0` - [Interest by
   * region](https://serpapi.com/google-trends-interest-by-region) - Accepts only
   * single query per search.
   * `RELATED_TOPICS` - [Related
   * topics](https://serpapi.com/google-trends-related-topics) - Accepts only single
   * query per search.
   * `RELATED_QUERIES` - [Related
   * queries](https://serpapi.com/google-trends-related-queries) - Accepts only
   * single query per search.
   */
  data_type?: string;

  /**
   * Time Zone
   * Parameter is used to define a time zone. The default value is set to `420`
   * (Pacific time zone: -07:00). Value is shown in minutes and can span from `-1439`
   * to `1439`. tz parameter affects timestamps in response.
   */
  tz?: string;

  /**
   * Category
   * Parameter is used to define a search category. The default value is set to `0`
   * ("All categories"). Head to the [Google Trends
   * Categories](https://serpapi.com/google-trends-categories) for a full list of
   * supported Google Trends Categories.
   */
  cat?: string;

  /**
   * Property
   * Parameter is used for sorting results by property. The default property is set
   * to `Web Search` (activated when the value of gprop parameter is not set or
   * empty). Other available options:
   * `images` - Image Search
   * `news` - News Search
   * `froogle` - Google Shopping
   * `youtube` - YouTube Search
   */
  gprop?: string;

  /**
   * Date
   * Parameter is used to define a date. Available options:
   * `now 1-H` - Past hour
   * `now 4-H` - Past 4 hours
   * `now 1-d` - Past day
   * `now 7-d` - Past 7 days
   * `today 1-m` - Past 30 days
   * `today 3-m` - Past 90 days
   * `today 12-m` - Past 12 months
   * `today 5-y` - Past 5 years
   * `all` - 2004 - present
   * You can also pass custom values:
   * Dates from 2004 to present: `yyyy-mm-dd yyyy-mm-dd` (e.g. `2021-10-15
   * 2022-05-25`)
   * Dates with hours within a week range: `yyyy-mm-ddThh yyyy-mm-ddThh` (e.g.
   * `2022-05-19T10 2022-05-24T22`). Hours will be calculated depending on the tz
   * (time zone) parameter.
   */
  date?: string;

  /**
   * Show CSV
   * Parameter is used for retrieving the CSV results. Set the parameter to `true` to
   * retrieve CSV results as an array.
   */
  csv?: string;
};

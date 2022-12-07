export type GoogleEventsParameters = {
  engine: "google_events";

  /**
   * Search Query
   * Parameter defines the query you want to search. To search for events in a
   * specific location, just include the location inside your search query (e.g.
   * `Events in Austin, TX`).
   */
  q: string;

  /**
   * Location
   * Parameter defines from where you want the search to originate. If several
   * locations match the location requested, we'll pick the most popular one. Head to
   * the [/locations.json API](https://serpapi.com/locations-api) if you need more
   * precise control. location and uule parameters can't be used together. Avoid
   * utilizing location when setting the location outside the U.S. when using Google
   * Shopping and/or Google Product API.
   */
  location?: string;

  /**
   * Encoded Location
   * Parameter is the Google encoded location you want to use for the search. uule
   * and location parameters can't be used together.
   */
  uule?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `10` is
   * the 2nd page of results, `20` is the 3rd page of results, etc.).
   */
  start?: number;

  /**
   * Filtering
   * Parameter allows the use of different filters.
   * `date:today` - Today's Events
   * `date:tomorrow` - Tomorrow's Events
   * `date:week` - This Week's Events
   * `date:today` - Today's Weekend's Events
   * `date:next_week` - Next Week's Events
   * `date:month` - This Month's Events
   * `date:next_month` - Next Month's Events
   * `event_type:Virtual-Event` - Online Events
   * You can also mix different kinds of filters by separating them with a comma.
   * `event_type:Virtual-Event,date:today` Today's Online Events
   */
  htichips?: string;
};

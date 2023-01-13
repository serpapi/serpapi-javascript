import type { BaseParameters } from "../types.ts";

export type GoogleLocalServicesParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the service you want to search for.
   */
  q: string;

  /**
   * Place ID
   * Parameter defines the Google ID of a place. To aquire the ID you can eather use
   * [Google's place ID
   * finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder),
   * or SerpApi's [Google Maps API](https://serpapi.com/google-maps-api). Example ID
   * for "New York, NY, USA": `ChIJOwg_06VPwokRYv534QaPC8g`.
   */
  place_id: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Local Services search. It's
   * a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr`
   * for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Job Type
   * Parameter defines the type of a job, or a subcategory of a service you have
   * searched for. For example, if you search for "Electrician", you can be more
   * specific by adding a job_type (e.g. `job_type=Restore power`). You can find more
   * options under: `local_ads[index].services`.
   */
  job_type?: string;
};

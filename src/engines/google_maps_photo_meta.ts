import type { BaseParameters } from "../types.ts";

export type GoogleMapsPhotoMetaParameters = BaseParameters & {
  /**
   * Data ID
   * Parameter defines the Google Maps Photos' data ID. Find the data ID of a photo
   * using our [Google Maps Photos API](https://serpapi.com/google-maps-photos-api).
   */
  data_id: string;
};

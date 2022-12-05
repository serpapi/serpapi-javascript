import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleMapsPhotosParameters = {
  data_id: string;
  hl?: string;
  category_id?: string;
  next_page_token?: string;
};

export class GoogleMapsPhotos
  extends SearchEngine<GoogleMapsPhotosParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_maps_photos", apiKey, timeout);
  }
}

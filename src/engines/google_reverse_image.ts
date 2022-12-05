import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleReverseImageParameters = {
  q?: string;
  location?: string;
  uule?: string;
  google_domain?: string;
  gl?: string;
  hl?: string;
  lr?: string;
  start?: number;
  image_url: string;
};

export class GoogleReverseImage
  extends SearchEngine<GoogleReverseImageParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_reverse_image", apiKey, timeout);
  }
}

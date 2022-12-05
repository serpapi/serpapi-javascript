import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YandexImagesParameters = {
  text: string;
  yandex_domain?: string;
  width?: string;
  height?: string;
  file_type?: string;
  color?: string;
  orientation?: string;
  image_type?: string;
  site?: string;
  recent?: string;
  url?: string;
  crop?: string;
  crop_id?: string;
  p?: string;
};

export class YandexImages
  extends SearchEngine<YandexImagesParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yandex_images", apiKey, timeout);
  }
}

import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YandexVideosParameters = {
  text: string;
  yandex_domain?: string;
  duration?: string;
  hd?: string;
  within?: string;
  p?: string;
};

export class YandexVideos
  extends SearchEngine<YandexVideosParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yandex_videos", apiKey, timeout);
  }
}

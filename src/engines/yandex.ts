import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YandexParameters = {
  text: string;
  yandex_domain?: string;
  lang?: string;
  lr?: string;
  p?: string;
};

export class Yandex extends SearchEngine<YandexParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yandex", apiKey, timeout);
  }
}

import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleEventsParameters = {
  q: string;
  location?: string;
  uule?: string;
  start?: number;
  htichips?: string;
};

export class GoogleEvents
  extends SearchEngine<GoogleEventsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_events", apiKey, timeout);
  }
}

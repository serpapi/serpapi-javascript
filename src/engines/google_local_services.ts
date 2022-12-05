import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleLocalServicesParameters = {
  q: string;
  place_id: string;
  hl?: string;
  job_type?: string;
};

export class GoogleLocalServices
  extends SearchEngine<GoogleLocalServicesParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_local_services", apiKey, timeout);
  }
}

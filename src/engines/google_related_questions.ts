import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleRelatedQuestionsParameters = {
  next_page_token: string;
};

export class GoogleRelatedQuestions
  extends SearchEngine<GoogleRelatedQuestionsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_related_questions", apiKey, timeout);
  }
}

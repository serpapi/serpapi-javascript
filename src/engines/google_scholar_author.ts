export type GoogleScholarAuthorParameters = {
  engine: "google_scholar_author";
  author_id: string;
  hl?: string;
  view_op?: string;
  sort?: string;
  citation_id?: string;
  start?: number;
  num?: string;
};

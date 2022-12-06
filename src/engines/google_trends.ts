export type GoogleTrendsParameters = {
  engine: "google_trends";
  q: string;
  geo?: string;
  region?: string;
  data_type?: string;
  tz?: string;
  cat?: string;
  gprop?: string;
  date?: string;
  csv?: string;
};

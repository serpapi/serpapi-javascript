export type HomeDepotParameters = {
  engine: "home_depot";
  q: string;
  hd_sort?: string;
  hd_filter_tokens?: string;
  delivery_zip?: string;
  store_id?: string;
  lowerbound?: string;
  upperbound?: string;
  nao?: string;
  page?: string;
  ps?: number;
};

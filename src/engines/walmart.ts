export type WalmartParameters = {
  engine: "walmart";
  query: string;
  sort?: string;
  soft_sort?: boolean;
  grid?: boolean;
  cat_id?: string;
  facet?: string;
  store_id?: string;
  min_price?: string;
  max_price?: string;
  spelling?: boolean;
  nd_en?: boolean;
  page?: string;
  ps?: number;
};

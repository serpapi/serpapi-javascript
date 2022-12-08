export type HomeDepotProductParameters = {
  /**
   * Product ID
   * HomeDepot identifier of a product
   */
  product_id: string;

  /**
   * ZIP Code
   * ZIP Postal code. To filter the shipping products by a selected area.
   */
  delivery_zip?: string;

  /**
   * Store ID
   * Store Id to filter the products by the specific store only.
   */
  store_id?: string;
};

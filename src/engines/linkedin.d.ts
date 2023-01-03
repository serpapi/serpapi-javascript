import type { BaseParameters } from "../types.d.ts";

export type LinkedinParameters = BaseParameters & {
  /**
   * First Name
   * LinkedIn profile first name. Used as a part of url eg:
   * `https://www.linkedin.com/pub/dir/first_name/last_name`
   */
  first_name: string;

  /**
   * Last Name
   * LinkedIn profile last name. Used as a part of url eg:
   * `https://www.linkedin.com/pub/dir/first_name/last_name`
   */
  last_name?: string;
};

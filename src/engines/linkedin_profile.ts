import type { BaseParameters } from "../types.ts";

export type LinkedinProfileParameters = BaseParameters & {
  /**
   * Profile ID
   * LinkedIn profile ID. Can be found in profile url, e.g. profile id for
   * https://www.linkedin.com/in/john-doe is john-doe
   */
  profile_id: string;
};

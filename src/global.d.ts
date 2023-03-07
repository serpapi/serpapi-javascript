/**
 * Used to check if the module is being ran on Vercel Edge functions:
 * https://vercel.com/docs/concepts/functions/edge-functions/edge-runtime#check-if-you're-running-on-the-edge-runtime
 *
 * This declaration exists so that Deno is aware of this possible global variable.
 */
declare const EdgeRuntime: string | undefined;

/**
 * Example works for Node.js 7 and newer.
 */

const Dotenv = require("dotenv");
const { config, getJson } = require("serpapi");

Dotenv.config();
const apiKey = process.env.API_KEY;

const run = async () => {
  const params = {
    engine: "google",
    q: "Coffee",
    api_key: apiKey,
  };

  // Show result as JSON (async/await)
  const response1 = await getJson(params);
  console.log(response1["organic_results"]);

  // Show result as JSON (callback)
  getJson(params, (json) => console.log(json["organic_results"]));

  // Use global config
  config.api_key = apiKey;
  const response2 = await getJson({ engine: "google", q: "Coffee" });
  console.log(response2["organic_results"]);
};

run();

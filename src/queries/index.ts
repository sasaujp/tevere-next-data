import * as Country from "./country.js";
import * as Capital from "./capital.js";

export const Queries = {
  [Country.Category]: Country.Queries,
  [Capital.Category]: Capital.Queries,
};

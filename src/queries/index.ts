import * as Country from "./country.js";
import * as Capital from "./city.js";
import * as State from "./state.js";
import * as League from "./league.js";

export const Queries = {
  [Country.Category]: Country.Queries,
  [Capital.Category]: Capital.Queries,
  [State.Category]: State.Queries,
  [League.Category]: League.Queries,
};

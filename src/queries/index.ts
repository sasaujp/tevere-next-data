import * as Country from "./country.js";
import * as Capital from "./capital.js";
import * as State from "./state.js";
import * as League from "./league.js";
import * as LeagueMember from "./leagueMember.js";

export const Queries = {
  [Country.Category]: Country.Queries,
  [Capital.Category]: Capital.Queries,
  [State.Category]: State.Queries,
  [League.Category]: League.Queries,
  [LeagueMember.Category]: LeagueMember.Queries,
};

import { leagueQuery } from "./league.js";
import { QueryType } from "./type.js";

const CapitalLabel: QueryType = {
  name: "label",
  query: `
  SELECT DISTINCT ?leagueMember ?label ?language WHERE {
    ${leagueQuery}
    BIND (?state AS ?leagueMember)
    ?leagueMember rdfs:label ?label .
    BIND (LANG(?label) AS ?language)
  }
  `,
};

const Coordinates: QueryType = {
  name: "coordinates",
  query: `
  SELECT DISTINCT ?leagueMember ?coordinates WHERE {
    ${leagueQuery}
    BIND (?state AS ?leagueMember)
    ?leagueMember wdt:P625 ?coordinates .
  }
  `,
};

const Flag: QueryType = {
  name: "flag",
  query: `
  SELECT DISTINCT ?leagueMember ?flag WHERE {
    ${leagueQuery}
    BIND (?state AS ?leagueMember)
    ?leagueMember wdt:P41 ?flag .
  }
  `,
};

export const Category = "leagueMember";
export const Queries = {
  [CapitalLabel.name]: CapitalLabel,
  [Coordinates.name]: Coordinates,
  [Flag.name]: Flag,
};

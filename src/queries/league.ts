import { QueryType } from "./type.js";

export const leagueQuery = `
  ?league wdt:P31 wd:Q170156 .
  FILTER NOT EXISTS { ?league wdt:P31 wd:Q6256 . }
  FILTER NOT EXISTS { ?league wdt:P31 wd:Q3024240 . }
  {
    ?state wdt:P463 ?league .
  } UNION {
    ?league wdt:P150 ?state .
  }
  {
    ?state wdt:P31 wd:Q6256 .
  } UNION {
    ?state wdt:P31 wd:Q3024240 .
  } UNION {
    ?state wdt:P31 wd:Q7275 .
  } UNION {
    ?state wdt:P31/wdt:P279* wd:Q515 .
  } UNION {
    ?state wdt:P31 wd:Q133442 .
  } UNION {
    ?state wdt:P31 wd:Q148837 .
  }
`;

const Inception: QueryType = {
  name: "inception",
  query: `
  SELECT DISTINCT ?league ?inception WHERE {
    ${leagueQuery}
    ?league wdt:P571 ?inception .
  }
  `,
};

const Dissolution: QueryType = {
  name: "dissolution",
  query: `
  SELECT DISTINCT ?league ?dissolution WHERE {
    ${leagueQuery}
    ?league wdt:P576 ?dissolution .  
  }
  `,
};

const Label: QueryType = {
  name: "label",
  query: `
  SELECT DISTINCT ?league ?label ?language WHERE {
    ${leagueQuery}
    ?league rdfs:label ?label .
    BIND (LANG(?label) AS ?language) .
  }
  `,
};

const State: QueryType = {
  name: "state",
  query: `
  SELECT DISTINCT ?league ?state WHERE {
    ${leagueQuery}
  }
  `,
};

const Flag: QueryType = {
  name: "flag",
  query: `
  SELECT DISTINCT ?league ?flag WHERE {
    ${leagueQuery}
    ?league wdt:P41 ?flag .
  }
  `,
};

export const Category = "league";
export const Queries = {
  [Inception.name]: Inception,
  [Dissolution.name]: Dissolution,
  [Label.name]: Label,
  [State.name]: State,
  [Flag.name]: Flag,
};

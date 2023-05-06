import { QueryType } from "./type.js";

export const stateQuery = `
  {
    ?state wdt:P31 wd:Q7275 .
  } UNION {
    ?state wdt:P31 wd:Q133442 .
  } UNION {
    ?state wdt:P31 wd:Q148837 .
  }
  FILTER NOT EXISTS { ?state wdt:P31 wd:Q6256 . }
  FILTER NOT EXISTS { ?state wdt:P31 wd:Q3024240 .}
  ?state wdt:P571 ?inception .
  ?state wdt:P576 ?dissolution .  
`;

const Inception: QueryType = {
  name: "inception",
  query: `
  SELECT DISTINCT ?state ?inception WHERE {
    ${stateQuery}
  }
  `,
};

const Dissolution: QueryType = {
  name: "dissolution",
  query: `
  SELECT DISTINCT ?state ?dissolution WHERE {
    ${stateQuery}
  }
  `,
};

const Coordinates: QueryType = {
  name: "coodinates",
  query: `
  SELECT DISTINCT ?state ?coordinates WHERE {
    ${stateQuery}
    ?state wdt:P625 ?coordinates .
  }
  `,
};

const Label: QueryType = {
  name: "label",
  query: `
  SELECT DISTINCT ?state ?label ?language WHERE {
    ${stateQuery}
    ?state rdfs:label ?label .
    BIND (LANG(?label) AS ?language) .
  }
  `,
};

const Flag: QueryType = {
  name: "flag",
  query: `
  SELECT DISTINCT ?state ?flag WHERE {
    ${stateQuery}
    ?state wdt:P41 ?flag .
  }
  `,
};

const Capital: QueryType = {
  name: "capital",
  query: `
  SELECT DISTINCT ?state ?capital ?startTime ?endTime ?pointInTime WHERE {
    ${stateQuery}
    ?state p:P36 ?capital_statement .
    ?capital_statement ps:P36 ?capital .
    OPTIONAL {
      ?capital_statement pq:P580 ?startTime .
    }
    OPTIONAL {
      ?capital_statement pq:P582 ?endTime .
    }
    OPTIONAL {
      ?capital_statement pq:P585 ?pointInTime .
    }
  }
  `,
};

export const Category = "state";
export const Queries = {
  [Inception.name]: Inception,
  [Dissolution.name]: Dissolution,
  [Coordinates.name]: Coordinates,
  [Label.name]: Label,
  [Flag.name]: Flag,
  [Capital.name]: Capital,
};

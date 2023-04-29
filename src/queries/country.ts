import { QueryType } from "./type.js";

const Inception: QueryType = {
  name: "inception",
  query: `
  SELECT DISTINCT ?country ?inception WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
    ?country wdt:P571 ?inception .
  }
  `,
};

const Dissolution: QueryType = {
  name: "dissolution",
  query: `
  SELECT DISTINCT ?country ?dissolution WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
    ?country wdt:P576 ?dissolution .
  }
  `,
};

const Coordinates: QueryType = {
  name: "coodinates",
  query: `
  SELECT DISTINCT ?country ?coordinates WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
    ?country wdt:P625 ?coordinates .
  }
  `,
};
`
`;
const Capital: QueryType = {
  name: "capital",
  query: `
  SELECT DISTINCT ?country ?capital ?startTime ?endTime ?pointInTime WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
    ?country p:P36 ?capital_statement .
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

const Label: QueryType = {
  name: "label",
  query: `
  SELECT DISTINCT ?country ?label ?language WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
      
    ?country rdfs:label ?label .
    BIND (LANG(?label) AS ?language)
  }
  `,
};

const Flag: QueryType = {
  name: "flag",
  query: `
  SELECT DISTINCT ?country ?flag WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
    ?country wdt:P41 ?flag .
  }
  `,
};

export const Category = "country";
export const Queries = {
  [Inception.name]: Inception,
  [Dissolution.name]: Dissolution,
  [Coordinates.name]: Coordinates,
  [Capital.name]: Capital,
  [Label.name]: Label,
  [Flag.name]: Flag,
};

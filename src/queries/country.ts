import { QueryType } from "./type.js";

const Inception: QueryType = {
  category: "country",
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
  category: "country",
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
  category: "country",
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

const Capital: QueryType = {
  category: "country",
  name: "capital",
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

const Label: QueryType = {
  category: "country",
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

export const Queries = {
  [Inception.name]: Inception,
  [Dissolution.name]: Dissolution,
  [Coordinates.name]: Coordinates,
  [Capital.name]: Capital,
  [Label.name]: Label,
};

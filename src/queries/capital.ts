import { QueryType } from "./type.js";

const Label: QueryType = {
  name: "label",
  query: `
  SELECT DISTINCT ?capital ?label ?language WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
    ?country wdt:P36 ?capital .
    ?capital rdfs:label ?label .
    BIND (LANG(?label) AS ?language)
  }
  `,
};

const Coordinates: QueryType = {
  name: "coordinates",
  query: `
  SELECT DISTINCT ?capital ?coordinates WHERE {
    {
      ?country wdt:P31/wdt:P279* wd:Q7275 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q6256 .
    } UNION {
      ?country wdt:P31/wdt:P279* wd:Q3024240 .
    }
    ?country wdt:P36 ?capital .
    ?capital wdt:P625 ?coordinates .
  }
  `,
};

export const Category = "capital";
export const Queries = {
  [Label.name]: Label,
  [Coordinates.name]: Coordinates,
};

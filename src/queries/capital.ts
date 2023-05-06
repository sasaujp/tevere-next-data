import { countryQuery } from "./country.js";
import { QueryType } from "./type.js";

const CapitalLabel: QueryType = {
  name: "label",
  query: `
  SELECT DISTINCT ?capital ?label ?language WHERE {
    ${countryQuery}
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
    ${countryQuery}
    ?country wdt:P36 ?capital .
    ?capital wdt:P625 ?coordinates .
  }
  `,
};

export const Category = "capital";
export const Queries = {
  [CapitalLabel.name]: CapitalLabel,
  [Coordinates.name]: Coordinates,
};

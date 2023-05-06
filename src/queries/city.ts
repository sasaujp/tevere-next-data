import { countryQuery } from "./country.js";
import { QueryType } from "./type.js";

const CapitalLabel: QueryType = {
  name: "label",
  query: `
  SELECT DISTINCT ?city ?label ?language WHERE {
    ${countryQuery}
    ?country wdt:P36 ?city .
    ?city rdfs:label ?label .
    BIND (LANG(?label) AS ?language)
  }
  `,
};

const Coordinates: QueryType = {
  name: "coordinates",
  query: `
  SELECT DISTINCT ?city ?coordinates WHERE {
    ${countryQuery}
    ?country wdt:P36 ?city .
    ?city wdt:P625 ?coordinates .
  }
  `,
};

export const Category = "city";
export const Queries = {
  [CapitalLabel.name]: CapitalLabel,
  [Coordinates.name]: Coordinates,
};

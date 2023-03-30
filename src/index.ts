import queryWikidata from "./queryWikidata.mjs";
import { Command } from "@commander-js/extra-typings";

const sparqlQuery = `
  SELECT ?city ?cityLabel WHERE {
    ?city wdt:P31 wd:Q515. # instance of city
    ?city wdt:P1082 ?population. # has population property
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
  ORDER BY DESC(?population)
  LIMIT 5
`;

const program = new Command();
program.argument("<file>").action(async (file) => {
  const response = await queryWikidata(sparqlQuery);
  console.log(response);
  console.log("debug", file);
});

program.parse();

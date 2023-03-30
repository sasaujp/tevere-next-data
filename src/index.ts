import queryWikidata from "./queryWikidata.mjs";

const sparqlQuery = `
  SELECT ?city ?cityLabel WHERE {
    ?city wdt:P31 wd:Q515. # instance of city
    ?city wdt:P1082 ?population. # has population property
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
  ORDER BY DESC(?population)
  LIMIT 5
`;

(async () => {
  console.log("start");
  const response = await queryWikidata(sparqlQuery);
  console.log(response);
})();

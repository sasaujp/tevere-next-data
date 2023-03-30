import fetch from "node-fetch";

async function queryWikidata(sparqlQuery: string) {
  const url = "https://query.wikidata.org/sparql";
  const queryUrl = `${url}?query=${encodeURIComponent(
    sparqlQuery
  )}&format=json`;

  try {
    const response = await fetch(queryUrl);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data from Wikidata:", error);
  }
}

export default queryWikidata;

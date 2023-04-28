import fetch from "node-fetch";
import { QueryType } from "./queries/type.js";
import fs from "fs";
import path from "path";

const sparqlBasePath = path.join(process.cwd(), "sparqlResults");

async function queryWikidata(sparqlQuery: QueryType) {
  const url = "https://query.wikidata.org/sparql";
  const queryUrl = `${url}?query=${encodeURIComponent(
    sparqlQuery.query
  )}&format=json`;

  const folderPath = path.join(sparqlBasePath, sparqlQuery.category);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  try {
    const response = await fetch(queryUrl);
    const jsonResponse = await response.json();
    fs.writeFileSync(
      path.join(folderPath, `${sparqlQuery.name}.json`),
      JSON.stringify(jsonResponse, null, 2)
    );
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data from Wikidata:", error);
  }
}

export default queryWikidata;

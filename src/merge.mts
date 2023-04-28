import fs from "fs";
import path from "path";

const sparqlBasePath = path.join(process.cwd(), "sparqlResults");
const basePath = path.join(process.cwd(), "results");

async function merge(category: string) {
  const folderPath = path.join(sparqlBasePath, category);

  if (!fs.existsSync(folderPath)) {
    console.error("No data found for this category");
    return;
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log("Error reading directory:", err);
      return;
    }

    const mergedData: any = {};

    files.forEach((file) => {
      if (path.extname(file) === ".json") {
        const filePath = path.join(folderPath, file);
        console.log("Found JSON file:", filePath);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const vars: string[] = jsonData["head"]["vars"].filter(
          (v: string) => v !== category
        );
        jsonData["results"]["bindings"].forEach((binding: any) => {
          const key = binding["country"]["value"];
          if (!mergedData[key]) {
            mergedData[key] = {};
          }
          if (vars.includes("language")) {
            const language = binding["language"]["value"];
            const label = binding["label"]["value"];
            if (!mergedData[key]["label"]) {
              mergedData[key]["label"] = {};
            }
            mergedData[key]["label"][language] = label;
          } else {
            vars.forEach((v: string) => {
              if (!mergedData[key][v]) {
                mergedData[key][v] = [];
              }
              mergedData[key][v].push(binding[v]["value"]);
            });
          }
        });
      }
    });
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
    fs.writeFileSync(
      path.join(basePath, `${category}.json`),
      JSON.stringify(mergedData, null, 2)
    );
  });
}

const _merge = () => {};

export default merge;

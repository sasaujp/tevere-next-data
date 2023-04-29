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
          const key = binding[category]["value"];
          if (!mergedData[key]) {
            mergedData[key] = {};
          }
          // ラベルやアブストラクトは言語ごとに分かれているので、それを統合する
          if (vars.includes("language")) {
            const language = binding["language"]["value"];
            const label = binding["label"]["value"];
            if (!mergedData[key]["label"]) {
              mergedData[key]["label"] = {};
            }
            mergedData[key]["label"][language] = label;
          } else if (vars.includes("capital")) {
            // 首都の場合
            const capital = binding["capital"]["value"];
            if (!mergedData[key]["capital"]) {
              mergedData[key]["capital"] = {};
            }
            if (!mergedData[key]["capital"][capital]) {
              mergedData[key]["capital"][capital] = {};
            }

            if (binding["startTime"]) {
              mergedData[key]["capital"][capital]["startTime"] =
                binding["startTime"]["value"];
            }
            if (binding["pointInTime"]) {
              mergedData[key]["capital"][capital]["pointInTime"] =
                binding["pointInTime"]["value"];
            }
            if (binding["endTime"]) {
              mergedData[key]["capital"][capital]["endTime"] =
                binding["endTime"]["value"];
            }
          } else {
            // それ以外の変数はそのまま統合する
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

import { readFileSync } from "fs";
import { basePath } from "./defines.js";
import path from "path";
import { generateSqlFile } from "./makeDB/index.js";

export type DBType = "country";

export const db = (type: DBType) => {
  switch (type) {
    case "country":
      generateSqlFile(
        JSON.parse(readFileSync(path.join(basePath, `country.json`), "utf-8")),
        JSON.parse(readFileSync(path.join(basePath, `capital.json`), "utf-8")),
        "data.sql"
      );
      break;
  }
};

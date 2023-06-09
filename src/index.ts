import queryWikidata from "./queryWikidata.mjs";
import merge from "./merge.mjs";
import { Command } from "@commander-js/extra-typings";
import { Queries } from "./queries/index.js";
import { basePath } from "./defines.js";
import path from "path";
import fs from "fs";
import { DBType, db } from "./db.js";

const program = new Command();
program
  .command("sparql <category> <target>")
  .action(async (category, target) => {
    if (target === "all") {
      const query = Queries[category as keyof typeof Queries];
      if (!query) {
        console.error("Invalid target");
        return;
      }
      for (const value of Object.values(query)) {
        const response = await queryWikidata(category, value);
        console.log(response);
      }
      return;
    }
    const query = Queries[category as keyof typeof Queries][target];
    if (!query) {
      console.error("Invalid target");
      return;
    }
    const response = await queryWikidata(category, query);
    console.log(response);
  });

program
  .command("merge")
  .argument("<target>")
  .action(async (target) => {
    if (target === "all") {
      for (const key of Object.keys(Queries)) {
        await merge(key);
      }
      return;
    }
    merge(target);
  });

program.command("db <target>").action(async (target) => {
  const dbType = target as DBType;
  switch (dbType) {
    case "country":
      db(target as DBType);
      break;
    default:
      console.error("Invalid target");
      return;
  }
});

program.parse();

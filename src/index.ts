import queryWikidata from "./queryWikidata.mjs";
import merge from "./merge.mjs";
import { Command } from "@commander-js/extra-typings";
import { Queries } from "./queries/index.js";

const program = new Command();
program
  .command("sparql <category> <target>")
  .action(async (category, target) => {
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
    merge(target);
  });

program.parse();

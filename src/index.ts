import queryWikidata from "./queryWikidata.mjs";
import merge from "./merge.mjs";
import { Command } from "@commander-js/extra-typings";
import { Queries } from "./queries/country.js";

const program = new Command();
program
  .command("sparql")
  .argument("<target>")
  .action(async (target) => {
    const query = Queries[target];
    if (!query) {
      console.error("Invalid target");
      return;
    }
    const response = await queryWikidata(query);
    console.log(response);
  });

program
  .command("merge")
  .argument("<target>")
  .action(async (target) => {
    merge(target);
  });

program.parse();

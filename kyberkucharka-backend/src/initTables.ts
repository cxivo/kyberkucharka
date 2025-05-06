import { exit } from "process";
import { createTables, dropTables, getRecipesByName, initTables } from "./databaseFunctions";

dropTables()
  .then(() => createTables())
  .then(() => initTables())
  .then(async () => {
    const a = await getRecipesByName("raňajky");
    console.log(a);
  }).then(() => {
    console.log("done! you can now kill the process");
    exit(0);
  });
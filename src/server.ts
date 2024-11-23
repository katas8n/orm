import "reflect-metadata";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Has been init");
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("There is a working server!");
    });
  })
  .catch(err => {
    console.error(err);
  });

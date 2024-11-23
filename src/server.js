"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const data_source_1 = require("./config/data-source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Has been init");
})
    .then(() => {
    app_1.app.listen(3000, () => {
        console.log("There is a working server!");
    });
})
    .catch(err => {
    console.error(err);
});

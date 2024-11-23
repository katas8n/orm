"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    username: "root",
    port: 3306,
    host: "localhost",
    database: "orm",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
});

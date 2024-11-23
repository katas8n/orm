import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  username: "root",
  port: 3306,
  host: "localhost",
  database: "orm",
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
});

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cart } from "../entities/Cart.entity.js";
import { Product } from "../entities/Product.entity.js";
import { Store } from "../entities/Store.entity.js";
import { User } from "../entities/User.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  username: "root",
  port: 3306,
  host: "localhost",
  database: "orm",
  synchronize: true,
  logging: true,
  entities: [User, Cart, Store, Product],
});

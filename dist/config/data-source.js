import { DataSource } from "typeorm";
import { Cart } from "../entities/Cart.entity.js";
import { Store } from "../entities/Store.entity.js";
import { User } from "../entities/User.entity.js";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "orm",
    synchronize: true,
    logging: true,
    entities: [User, Cart, Store],
});

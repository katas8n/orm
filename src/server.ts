import express, { Request, Response } from "express";
import { AppDataSource } from "./config/data-source.js";
import { Product } from "./entities/Product.entity.js";
import { Store } from "./entities/Store.entity.js";
import { User } from "./entities/User.entity.js";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Yep!");

    app.post("/store", async (req, res) => {
      const { name, products } = req.body;

      const store = new Store();
      store.name = name;
      store.products = products.map((p: any) => {
        const product = new Product();
        product.name = p.name;
        product.price = p.price;
        return product;
      });

      await AppDataSource.getRepository(Store).save(store);
      res.json(store);
    });

    app.post("/cart/:userId/add", async (req: Request, res: Response): Promise<any> => {
      const { userId } = req.params;
      const { productId } = req.body;

      const userRepo = AppDataSource.getRepository(User);
      const productRepo = AppDataSource.getRepository(Product);

      const user = await userRepo.findOne({
        where: { id: +userId },
        relations: { cart: { products: true } },
      });

      const product = await productRepo.findOneBy({ id: productId });

      if (!user || !product) return res.status(404).send("User or Product not found");

      user.cart.products.push(product);
      await userRepo.save(user);

      res.json(user.cart);
    });

    app.post("/cart/:userId/buy", async (req: Request, res: Response): Promise<any> => {
      const { userId } = req.params;

      const userRepo = AppDataSource.getRepository(User);
      const productRepo = AppDataSource.getRepository(Product);

      const user = await userRepo.findOne({
        where: { id: +userId },
        relations: { cart: { products: true } },
      });

      if (!user) return res.status(404).send("User not found");

      const total = user.cart.products.reduce((sum, p) => sum + Number(p.price), 0);

      if (user.balance < total) return res.status(400).send("Insufficient balance");

      user.balance -= total;
      user.cart.products = [];

      await userRepo.save(user);
      res.json({ message: "Purchase successful", remainingBalance: user.balance });
    });

    app.listen(3000, () => {
      console.log("Server is running!");
    });
  })
  .catch(err => console.error(err));

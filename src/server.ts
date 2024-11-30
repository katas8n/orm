import express, { Request, Response } from "express";
import { AppDataSource } from "./config/data-source.js";
import { Cart } from "./entities/Cart.entity.js";
import { Product } from "./entities/Product.entity.js";
import { Store } from "./entities/Store.entity.js";
import { User } from "./entities/User.entity.js";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Has been init");
    app.post("/user", async (req: Request, res: Response): Promise<any> => {
      const { name, email, balance } = req.body;

      const user = new User();
      user.name = name;
      user.email = email;
      user.balance = balance;
      user.cart = new Cart();

      await AppDataSource.getRepository(User).save(user);

      res.json({
        msg: `
          There was created a ${user.name} ${user.email} with ${user.balance}$
        `,
      });
    });

    app.post("/store", async (req: Request, res: Response): Promise<any> => {
      const { name, products } = req.body;

      const store = new Store();
      store.name = name;

      store.products = products.map(async (incomingProduct: any) => {
        const product = new Product();
        product.name = incomingProduct.name;
        product.price = incomingProduct.price;

        await AppDataSource.getRepository(Product).save(product);
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
        where: { id: +userId! },
        relations: {
          cart: {
            products: true,
          },
        },
      });

      const product = await productRepo.findOneBy({ id: productId });

      if (!user || !product) return res.json({ msg: "How could you even imagine this shift?" });

      user.cart.products.push(product);
      await userRepo.save(user);

      res.json({
        msg: ` ${user.cart.products[user.cart.products.length - 1].name}`,
      });
    });

    app.post("/cart", async (req: Request, res: Response): Promise<any> => {
      const { userId } = req.body;

      const userRepo = AppDataSource.getRepository(User);
      const cart = new Cart();

      cart.products = [];

      const user = await userRepo.findOneBy({ id: +userId });
      user!.cart = cart;

      AppDataSource.getRepository(Cart).save(cart!);
      AppDataSource.getRepository(User).save(user!);

      res.json({
        msg: `
          There is a ${user?.name} has gotten a cart with id ${user?.cart.id}. And the products in a cart: ${cart.products}
        `,
      });
    });

    app.post("/cart/:userId/buy", async (req: Request, res: Response): Promise<any> => {
      const { userId } = req.params;

      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOne({
        where: { id: +userId! },
        relations: {
          cart: {
            products: true,
          },
        },
      });

      if (!user) return res.json({ msg: "User not found!" });

      const toSpend = user.cart.products.reduce((sum, acc) => sum + Number(acc.price), 0);

      if (user.balance < toSpend) return res.json({ msg: "Not enough money!" });

      user.balance -= toSpend;
      user.cart.products = [];

      await userRepo.save(user);

      res.json({
        msg: `
          The user balance now is : ${user.balance}
        `,
      });
    });

    app.listen(3000, () => {
      console.log("There is a working server!");
    });
  })
  .catch(err => {
    console.error(err);
  });

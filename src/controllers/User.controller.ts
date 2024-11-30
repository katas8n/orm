import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Product } from "../entities/Product.entity.js";
import { User } from "../entities/User.entity.js";

export class UserController {
  static async buyProduct(req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const productRepo = AppDataSource.getRepository(Product);

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["cart"],
    });

    const product = await productRepo.findOne({
      where: {
        id: productId,
      },
    });

    const sum = product!.price * quantity;

    if (user!.balance < sum) return res.json(400).json({ msg: "Not enough money!" });

    user!.balance -= sum;
    product!.quantity -= quantity;

    await userRepo.save(user!);
    await productRepo.save(product!);

    res.json({
      message: "OK",
      user,
      product,
    });
  }
}

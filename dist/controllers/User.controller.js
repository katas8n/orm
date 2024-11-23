"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../config/data-source");
const Product_entity_1 = require("../entities/Product.entity");
const User_entity_1 = require("../entities/User.entity");
class UserController {
    static async buyProduct(req, res) {
        const { userId, productId, quantity } = req.body;
        const userRepo = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const productRepo = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ["cart"],
        });
        const product = await productRepo.findOne({
            where: {
                id: productId,
            },
        });
        const sum = product.price * quantity;
        if (user.wallet < sum)
            return res.json(400).json({ msg: "Not enough money!" });
        user.wallet -= sum;
        product.quantity -= quantity;
        await userRepo.save(user);
        await productRepo.save(product);
        res.json({
            message: "OK",
            user,
            product,
        });
    }
}
exports.UserController = UserController;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../config/data-source");
const Product_entity_1 = require("../entities/Product.entity");
const User_entity_1 = require("../entities/User.entity");
class UserController {
    static buyProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, productId, quantity } = req.body;
            const userRepo = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            const productRepo = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
            const user = yield userRepo.findOne({
                where: { id: userId },
                relations: ["cart"],
            });
            const product = yield productRepo.findOne({
                where: {
                    id: productId,
                },
            });
            const sum = product.price * quantity;
            if (user.wallet < sum)
                return res.json(400).json({ msg: "Not enough money!" });
            user.wallet -= sum;
            product.quantity -= quantity;
            yield userRepo.save(user);
            yield productRepo.save(product);
            res.json({
                message: "OK",
                user,
                product,
            });
        });
    }
}
exports.UserController = UserController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routes/user.router");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/user", user_router_1.userRouter);

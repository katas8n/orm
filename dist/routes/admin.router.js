"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.post("/add-product");
exports.adminRouter.post("/delete-product/:id");

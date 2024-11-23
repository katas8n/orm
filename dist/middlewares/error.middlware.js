"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, nextF) => {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!" });
};
exports.errorHandler = errorHandler;

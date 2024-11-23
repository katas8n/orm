"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const adminAuth = (req, res, nextF) => {
    const { password } = req.body;
    if (password !== "232323") {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    nextF();
};
exports.adminAuth = adminAuth;

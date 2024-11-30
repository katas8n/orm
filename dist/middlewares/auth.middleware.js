export const adminAuth = (req, res, nextF) => {
    const { password } = req.body;
    if (password !== "232323") {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    nextF();
};

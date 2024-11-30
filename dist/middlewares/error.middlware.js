export const errorHandler = (err, req, res, nextF) => {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!" });
};

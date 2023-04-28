import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, data) => {
        if (err) return res.status(403).json(err);
        req.userID = data._id;
        return next();
    });
};

export default authMiddleware;

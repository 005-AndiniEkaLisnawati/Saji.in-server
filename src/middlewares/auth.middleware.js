import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;  

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (req.method === 'OPTIONS') {
    return next();
  }
  
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You don't have enough privileges" });
        }
        next();
    };
};


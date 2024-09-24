import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token is invalid' });
        req.user = user.userId;
        next();
    });
}


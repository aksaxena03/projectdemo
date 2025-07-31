"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("./config/jwt.config");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
            res.status(401).json({ error: 'Invalid authorization header' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwt_config_1.JWT_SECRET);
        req.userid = decoded.userid;
        next();
    }
    catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({
            error: 'Authentication failed',
            details: error instanceof jsonwebtoken_1.default.JsonWebTokenError ? error.message : 'Unknown error'
        });
    }
};
exports.authMiddleware = authMiddleware;

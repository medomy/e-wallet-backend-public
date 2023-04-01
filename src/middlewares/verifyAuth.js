"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET_ADMIN, TOKEN_SECRET_NORMAL } = process.env;
class AuthVerification {
    static verifyAdmin(req, res, next) {
        try {
            const authorizationToken = req.headers.authorization.split(" ")[1];
            jsonwebtoken_1.default.verify(authorizationToken, TOKEN_SECRET_ADMIN);
            next();
        }
        catch (err) {
            res.status(401).json({ error: err.message });
            //throw new Error(`could not verify , ${err}`);
        }
    }
    static verifyUser(req, res, next) {
        try {
            const authorizationToken = req.headers.authorization.split(" ")[1];
            jsonwebtoken_1.default.verify(authorizationToken, TOKEN_SECRET_NORMAL);
            next();
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
    static verifyBoth(req, res, next) {
        try {
            const authorizationToken = req.headers.authorization.split(" ")[1];
            jsonwebtoken_1.default.verify(authorizationToken, TOKEN_SECRET_ADMIN);
            next();
        }
        catch (err) {
            try {
                const authorizationToken = req.headers.authorization.split(" ")[1];
                jsonwebtoken_1.default.verify(authorizationToken, TOKEN_SECRET_NORMAL);
                next();
            }
            catch (e) {
                res.status(401).json({ error: e.message });
            }
        }
    }
}
exports.default = AuthVerification;

import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { TOKEN_SECRET_ADMIN, TOKEN_SECRET_NORMAL } = process.env;
class AuthVerification {
    static verifyAdmin(req: express.Request, res: express.Response, next: Function) {
        try {
            const authorizationToken = req.headers.authorization!.split(" ")[1];
            jwt.verify(authorizationToken, TOKEN_SECRET_ADMIN!);
            next();
        } catch (err: any) {
            res.status(401).json({ error: err.message });
            //throw new Error(`could not verify , ${err}`);
        }
    }

    static verifyUser(req: express.Request, res: express.Response, next: Function) {
        try {
            const authorizationToken = req.headers.authorization!.split(" ")[1];
            jwt.verify(authorizationToken, TOKEN_SECRET_NORMAL!);
            next();
        } catch (err: any) {
            res.status(401).json({ error: err.message });
        }
    }

    static verifyBoth(req: express.Request, res: express.Response, next: Function) {
        try {
            const authorizationToken = req.headers.authorization!.split(" ")[1];
            jwt.verify(authorizationToken, TOKEN_SECRET_ADMIN!);
            next();
        } catch (err) {
            try {
                const authorizationToken = req.headers.authorization!.split(" ")[1];
                jwt.verify(authorizationToken, TOKEN_SECRET_NORMAL!);
                next();
            } catch (e: any) {
                res.status(401).json({ error: e.message });
            }
        }
    }
}

export default AuthVerification;
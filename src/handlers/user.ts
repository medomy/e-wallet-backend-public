import express from 'express';
import { User } from '../types/user';
import UserStore from '../stores/userStore';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import AuthVerification from '../middlewares/verifyAuth';

dotenv.config();
const { TOKEN_SECRET_NORMAL, TOKEN_SECRET_ADMIN } = process.env;

async function indexAll(req: express.Request, res: express.Response) {
    try {
        const users = await UserStore.getAllUsers();
        res.json(users);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}

async function indexNonAdmin(req: express.Request, res: express.Response) {
    try {
        const users = await UserStore.getNonAdminUsers();
        //console.log(jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNb2hhbWVkIFNhbGFoIDIiLCJtb2JpbGVOdW1iZXIiOiIwMTAwMjMwNDIyNiIsImJhbGFuY2UiOjEwMCwicHJvZmlsZVBpYyI6Im5vIiwicm9sZSI6ImFkbWluIiwiaWQiOiI2NDBmYTllOTY0N2Y2MWNmYTMzOTY3Y2QifSwiaWF0IjoxNjc4NzQ4MTM3fQ.oHd0k0gloWaXhiu_yBFDcaDRcMWFm15UPP2Q-aKHLw4"));
        res.json(users);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}

async function show(req: express.Request, res: express.Response) {
    try {
        const user = await UserStore.getOneUser(req.params.id);
        res.json(user);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}

async function showUserMobile(req: express.Request, res: express.Response) {
    try {
        const user = await UserStore.getOneUserMobilePhone(req.params.mobile);
        //console.log(req.params , user);
        user ? res.json({
            name: user?.name,
            mobileNumber: user?.mobileNumber,
            profile: user.profilePic,
            id: user._id
        }) : res.status(404).json({
            status: "couldn't find user"
        });
    } catch (err: any) {
        res.status(401).json({
            error: err.message
        })
    }
}

async function create(req: express.Request, res: express.Response) {
    try {
        const user: User = {
            name: req.body.name,
            password: req.body.password,
            mobileNumber: req.body.mobile,
            balance: req.body.balance,
            profilePic: req.body.profile,
            role: req.body.role
        }
        const createdUser = await UserStore.createUser(user);
        const token = jwt.sign({
            user: {
                name: createdUser.name,
                mobileNumber: createdUser.mobileNumber,
                balance: createdUser.balance,
                profilePic: createdUser.profilePic,
                role: createdUser.role,
                id: createdUser._id
            }
        }, user.role === "admin" ? TOKEN_SECRET_ADMIN! : TOKEN_SECRET_NORMAL!)

        res.json(token);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}

async function removeUser(req: express.Request, res: express.Response) {
    try {
        const user = await UserStore.deleteUser(req.params.id);
        res.json(user);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}

async function signIn(req: express.Request, res: express.Response) {
    try {
        const signedInUser = await UserStore.authenticateUser(req.body.mobile, req.body.password);
        if (signedInUser) {
            res.json(jwt.sign({
                user: {
                    name: signedInUser.name,
                    mobileNumber: signedInUser.mobileNumber,
                    balance: signedInUser.balance,
                    profilePic: signedInUser.profilePic,
                    role: signedInUser.role,
                    id: signedInUser._id
                }
            }, signedInUser.role === "admin" ? TOKEN_SECRET_ADMIN! : TOKEN_SECRET_NORMAL!))
        }
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
}

function usersHandler(route: express.Router) {
    route.get("/usersMobile/:mobile", AuthVerification.verifyBoth, showUserMobile);
    route.get("/allUsers", AuthVerification.verifyAdmin, indexAll);
    route.get("/users", AuthVerification.verifyAdmin, indexNonAdmin);
    route.get("/users/:id", AuthVerification.verifyBoth, show);
    route.post("/users", AuthVerification.verifyAdmin, create);
    route.post("/signIn", signIn);
    route.delete("/users/:id", AuthVerification.verifyAdmin, removeUser);
}

export default usersHandler;
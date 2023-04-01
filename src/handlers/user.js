"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userStore_1 = __importDefault(require("../stores/userStore"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
dotenv_1.default.config();
const { TOKEN_SECRET_NORMAL, TOKEN_SECRET_ADMIN } = process.env;
function indexAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userStore_1.default.getAllUsers();
            res.json(users);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
}
function indexNonAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userStore_1.default.getNonAdminUsers();
            //console.log(jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNb2hhbWVkIFNhbGFoIDIiLCJtb2JpbGVOdW1iZXIiOiIwMTAwMjMwNDIyNiIsImJhbGFuY2UiOjEwMCwicHJvZmlsZVBpYyI6Im5vIiwicm9sZSI6ImFkbWluIiwiaWQiOiI2NDBmYTllOTY0N2Y2MWNmYTMzOTY3Y2QifSwiaWF0IjoxNjc4NzQ4MTM3fQ.oHd0k0gloWaXhiu_yBFDcaDRcMWFm15UPP2Q-aKHLw4"));
            res.json(users);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userStore_1.default.getOneUser(req.params.id);
            res.json(user);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
}
function showUserMobile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userStore_1.default.getOneUserMobilePhone(req.params.mobile);
            console.log(req.params, user);
            user ? res.json({
                name: user === null || user === void 0 ? void 0 : user.name,
                mobileNumber: user === null || user === void 0 ? void 0 : user.mobileNumber,
                profile: user.profilePic,
                id: user._id
            }) : res.status(404).json({
                status: "couldn't find user"
            });
        }
        catch (err) {
            res.status(401).json({
                error: err.message
            });
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = {
                name: req.body.name,
                password: req.body.password,
                mobileNumber: req.body.mobile,
                balance: req.body.balance,
                profilePic: req.body.profile,
                role: req.body.role
            };
            const createdUser = yield userStore_1.default.createUser(user);
            const token = jsonwebtoken_1.default.sign({
                user: {
                    name: createdUser.name,
                    mobileNumber: createdUser.mobileNumber,
                    balance: createdUser.balance,
                    profilePic: createdUser.profilePic,
                    role: createdUser.role,
                    id: createdUser._id
                }
            }, user.role === "admin" ? TOKEN_SECRET_ADMIN : TOKEN_SECRET_NORMAL);
            res.json(token);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
}
function removeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userStore_1.default.deleteUser(req.params.id);
            res.json(user);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
}
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const signedInUser = yield userStore_1.default.authenticateUser(req.body.mobile, req.body.password);
            if (signedInUser) {
                res.json(jsonwebtoken_1.default.sign({
                    user: {
                        name: signedInUser.name,
                        mobileNumber: signedInUser.mobileNumber,
                        balance: signedInUser.balance,
                        profilePic: signedInUser.profilePic,
                        role: signedInUser.role,
                        id: signedInUser._id
                    }
                }, signedInUser.role === "admin" ? TOKEN_SECRET_ADMIN : TOKEN_SECRET_NORMAL));
            }
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    });
}
function usersHandler(route) {
    route.get("/usersMobile/:mobile", verifyAuth_1.default.verifyBoth, showUserMobile);
    route.get("/allUsers", verifyAuth_1.default.verifyAdmin, indexAll);
    route.get("/users", verifyAuth_1.default.verifyAdmin, indexNonAdmin);
    route.get("/users/:id", verifyAuth_1.default.verifyBoth, show);
    route.post("/users", verifyAuth_1.default.verifyAdmin, create);
    route.post("/signIn", signIn);
    route.delete("/users/:id", verifyAuth_1.default.verifyAdmin, removeUser);
}
exports.default = usersHandler;

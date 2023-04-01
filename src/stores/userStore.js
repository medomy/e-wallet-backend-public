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
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = require("bcrypt");
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                return users;
            }
            catch (err) {
                throw new Error(`couldn't get users , ${err}`);
            }
        });
    }
    static getNonAdminUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find({ role: "user" });
                return users;
            }
            catch (err) {
                throw new Error(`couldn't get users , ${err}`);
            }
        });
    }
    static getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(id);
                return user;
            }
            catch (err) {
                throw new Error(`couldn't get user ${id} , ${err}`);
            }
        });
    }
    static getOneUserMobilePhone(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ mobileNumber: mobile });
                return user;
            }
            catch (err) {
                throw new Error(`couldn't get user ${mobile} , ${err.message}`);
            }
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUser = yield user_1.default.create({
                    name: user.name,
                    password: (0, bcrypt_1.hashSync)(user.password + this.bcryptPassword, this.salt),
                    mobileNumber: user.mobileNumber,
                    profilePic: user.profilePic,
                    balance: user.balance,
                    role: user.role
                });
                yield createdUser.save();
                return createdUser;
            }
            catch (err) {
                throw new Error(`could not create user , ${err}`);
            }
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user_1.default.findByIdAndDelete(id);
                return deletedUser;
            }
            catch (err) {
                throw new Error(`couldn't delete user ${id} , ${err}`);
            }
        });
    }
    // authentication
    static authenticateUser(mobileNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find({ mobileNumber });
                if (users.length > 0) {
                    const user = users[0];
                    if ((0, bcrypt_1.compareSync)(password + BCRYPT_PASSWORD, user.password)) {
                        return user;
                    }
                    else
                        throw new Error(`password is incorrect`);
                }
                else
                    throw new Error('seems this user is not registered');
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
UserStore.bcryptPassword = BCRYPT_PASSWORD;
UserStore.salt = Number(SALT_ROUNDS);
exports.default = UserStore;

import { User } from "../types/user";
import userModel from '../models/user';
import dotenv from 'dotenv';
import { hashSync, compareSync } from "bcrypt";
dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    private static bcryptPassword = BCRYPT_PASSWORD;
    private static salt = Number(SALT_ROUNDS);
    static async getAllUsers() {
        try {
            const users = await userModel.find();
            return users;
        } catch (err) {
            throw new Error(`couldn't get users , ${err}`)
        }
    }
    static async getNonAdminUsers() {
        try {
            const users = await userModel.find({ role: "user" });
            return users;
        } catch (err) {
            throw new Error(`couldn't get users , ${err}`)
        }
    }
    static async getOneUser(id: string) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (err) {
            throw new Error(`couldn't get user ${id} , ${err}`)
        }
    }
    static async getOneUserMobilePhone(mobile: string) {
        try {
            const user = await userModel.findOne({ mobileNumber: mobile });
            return user;
        } catch (err: any) {
            throw new Error(`couldn't get user ${mobile} , ${err.message}`)
        }
    }
    static async createUser(user: User) {
        try {
            const createdUser = await userModel.create({
                name: user.name,
                password: hashSync(user.password + this.bcryptPassword!, this.salt),
                mobileNumber: user.mobileNumber,
                profilePic: user.profilePic,
                balance: user.balance,
                role: user.role
            })
            await createdUser.save();
            return createdUser;
        } catch (err) {
            throw new Error(`could not create user , ${err}`);
        }
    }
    static async deleteUser(id: string) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (err) {
            throw new Error(`couldn't delete user ${id} , ${err}`);
        }
    }

    // authentication

    static async authenticateUser(mobileNumber: string, password: string) {
        try {
            const users = await userModel.find({ mobileNumber });
            if (users.length > 0) {
                const user = users[0];
                if (compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
                else throw new Error(`password is incorrect`);
            }
            else throw new Error('seems this user is not registered');
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

}

export default UserStore;
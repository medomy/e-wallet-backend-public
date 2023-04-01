"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// name : string,
//     mobileNumber : string,
//     profilePic: string,
//     balance: number
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minLength: 6
    },
    mobileNumber: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^01[0125][0-9]{8}$/.test(v),
            message: "mobile number is not an Egyptian number"
        },
        unique: true,
        immutable: true
    },
    balance: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => v >= 5,
            message: "balance is below limit"
        },
    },
    profilePic: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        validate: {
            validator: (v) => v === "admin" || v === "user",
            message: "role value is not correct"
        }
    }
});
exports.default = mongoose_1.default.model("users", UserSchema);

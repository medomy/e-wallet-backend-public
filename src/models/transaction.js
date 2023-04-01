"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    fromMobile: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^01[0125][0-9]{8}$/.test(v),
            message: "mobile number is not an Egyptian number"
        },
    },
    toMobile: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^01[0125][0-9]{8}$/.test(v),
            message: "mobile number is not an Egyptian number"
        },
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    money: {
        type: Number,
        min: 5,
        required: true
    }
});
exports.default = mongoose_1.default.model("transactions", TransactionSchema);

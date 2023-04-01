import mongoose from "mongoose";
import { Transaction } from "../types/transaction";

const TransactionSchema = new mongoose.Schema<Transaction>(
    {
        fromMobile: {
            type: String,
            required: true,
            validate: {
                validator: (v: string) => /^01[0125][0-9]{8}$/.test(v),
                message: "mobile number is not an Egyptian number"
            },
        },
        toMobile: {
            type: String,
            required: true,
            validate: {
                validator: (v: string) => /^01[0125][0-9]{8}$/.test(v),
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
    }
)

export default mongoose.model("transactions", TransactionSchema);
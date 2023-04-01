import { Transaction } from "../types/transaction";
import transactionModel from "../models/transaction";

import dotenv from 'dotenv';
import UserStore from "./userStore";
dotenv.config();

class TransactionStore {
    static async getAllTransactions() {
        try {
            const transactions = await transactionModel.find();
            return transactions;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    static async getAllTransactionsMade(moibleNum: string) {
        try {
            const transactions = await transactionModel.find({ fromMobile: moibleNum});
            return transactions;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    static async getAllTransactionsRecieved(mobileNumber: string) {
        try {
            const transactions = await transactionModel.find({ toMobile: mobileNumber });
            return transactions;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    static async getTransactionById(id: string) {
        try {
            const transaction = await transactionModel.findById(id);
            return transaction;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    static async createTransaction(transaction: Transaction) {
        try {
            const [sendingUser, recievingUser] = await Promise.all(
                [
                    UserStore.getOneUserMobilePhone(transaction.fromMobile),
                    UserStore.getOneUserMobilePhone(transaction.toMobile)
                ]
            );
            if (recievingUser == null) throw new Error("could not find the recieving user");
            else if (transaction.money < 5) {
                throw new Error(`sent money is below limit`);
            }
            else if (transaction.money >= sendingUser!.balance) {
                throw new Error(`sent money is above balance`);
            }
            else {
                const createdTransaction = await transactionModel.create({
                    fromMobile: transaction.fromMobile,
                    toMobile: transaction.toMobile,
                    createdAt: transaction.createdAt,
                    money: transaction.money
                })
                sendingUser!.balance -= createdTransaction.money;
                sendingUser?.save();
                recievingUser.balance += createdTransaction.money;
                recievingUser.save();
                return createdTransaction;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default TransactionStore;
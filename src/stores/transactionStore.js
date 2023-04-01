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
const transaction_1 = __importDefault(require("../models/transaction"));
const dotenv_1 = __importDefault(require("dotenv"));
const userStore_1 = __importDefault(require("./userStore"));
dotenv_1.default.config();
class TransactionStore {
    static getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transaction_1.default.find();
                return transactions;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static getAllTransactionsMade(moibleNum) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transaction_1.default.find({ fromMobile: moibleNum });
                return transactions;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static getAllTransactionsRecieved(mobileNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transaction_1.default.find({ toMobile: mobileNumber });
                return transactions;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield transaction_1.default.findById(id);
                return transaction;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static createTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [sendingUser, recievingUser] = yield Promise.all([
                    userStore_1.default.getOneUserMobilePhone(transaction.fromMobile),
                    userStore_1.default.getOneUserMobilePhone(transaction.toMobile)
                ]);
                if (recievingUser == null)
                    throw new Error("could not find the recieving user");
                else if (transaction.money < 5) {
                    throw new Error(`sent money is below limit`);
                }
                else if (transaction.money >= sendingUser.balance) {
                    throw new Error(`sent money is above balance`);
                }
                else {
                    const createdTransaction = yield transaction_1.default.create({
                        fromMobile: transaction.fromMobile,
                        toMobile: transaction.toMobile,
                        createdAt: transaction.createdAt,
                        money: transaction.money
                    });
                    sendingUser.balance -= createdTransaction.money;
                    sendingUser === null || sendingUser === void 0 ? void 0 : sendingUser.save();
                    recievingUser.balance += createdTransaction.money;
                    recievingUser.save();
                    return createdTransaction;
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
exports.default = TransactionStore;

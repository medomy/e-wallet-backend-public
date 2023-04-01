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
const transactionStore_1 = __importDefault(require("../stores/transactionStore"));
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
function indexAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield transactionStore_1.default.getAllTransactions();
            res.send(transactions);
        }
        catch (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
    });
}
function indexMadeTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield transactionStore_1.default.getAllTransactionsMade(req.params.madeMobile);
            res.send(transactions);
        }
        catch (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
    });
}
function indexRecievedTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield transactionStore_1.default.getAllTransactionsRecieved(req.params.recievedMobile);
            res.send(transactions);
        }
        catch (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
    });
}
function showTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield transactionStore_1.default.getTransactionById(req.params.id);
            res.send(transaction);
        }
        catch (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
    });
}
function createTransaction(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = {
                fromMobile: req.body.from,
                toMobile: req.body.to,
                createdAt: (_a = req.body.date) !== null && _a !== void 0 ? _a : new Date(),
                money: req.body.money
            };
            const createdTransaction = yield transactionStore_1.default.createTransaction(transaction);
            res.json(createdTransaction);
        }
        catch (err) {
            res.status(404);
            res.json({
                error: err.message
            });
        }
    });
}
function transactionHandlers(route) {
    route.get("/transactions", verifyAuth_1.default.verifyAdmin, indexAll);
    route.get("/transactionsMade/:madeMobile", verifyAuth_1.default.verifyBoth, indexMadeTransactions);
    route.get("/transactionsRecieved/:recievedMobile", verifyAuth_1.default.verifyBoth, indexRecievedTransactions);
    route.get("/transactions/:id", verifyAuth_1.default.verifyBoth, showTransaction);
    route.post("/transactions", verifyAuth_1.default.verifyBoth, createTransaction);
}
exports.default = transactionHandlers;

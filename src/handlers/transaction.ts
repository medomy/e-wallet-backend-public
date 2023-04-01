import express from 'express';
import { Transaction } from '../types/transaction';
import TransactionStore from '../stores/transactionStore';
import AuthVerification from '../middlewares/verifyAuth';

async function indexAll(req: express.Request, res: express.Response) {
    try {
        const transactions = await TransactionStore.getAllTransactions();
        res.send(transactions);
    } catch (err: any) {
        res.status(500);
        res.json({
            error: err.message
        })
    }
}

async function indexMadeTransactions(req: express.Request, res: express.Response) {
    try {
        const transactions = await TransactionStore.getAllTransactionsMade(req.params.madeMobile);
        res.send(transactions);
    } catch (err: any) {
        res.status(500);
        res.json({
            error: err.message
        })
    }
}

async function indexRecievedTransactions(req: express.Request, res: express.Response) {
    try {
        const transactions = await TransactionStore.getAllTransactionsRecieved(req.params.recievedMobile);
        res.send(transactions);
    } catch (err: any) {
        res.status(500);
        res.json({
            error: err.message
        })
    }
}
async function showTransaction(req: express.Request, res: express.Response) {
    try {
        const transaction = await TransactionStore.getTransactionById(req.params.id);
        res.send(transaction);
    } catch (err: any) {
        res.status(500);
        res.json({
            error: err.message
        })
    }
}
async function createTransaction(req: express.Request, res: express.Response) {
    try {
        const transaction: Transaction = {
            fromMobile: req.body.from,
            toMobile: req.body.to,
            createdAt: req.body.date ?? new Date(),
            money: req.body.money
        }
        const createdTransaction = await TransactionStore.createTransaction(transaction);
        res.json(createdTransaction);
    } catch (err: any) {
        res.status(404);
        res.json({
            error: err.message
        })
    }
}

function transactionHandlers(route: express.Router) {
    route.get("/transactions", AuthVerification.verifyAdmin, indexAll);
    route.get("/transactionsMade/:madeMobile", AuthVerification.verifyBoth, indexMadeTransactions);
    route.get("/transactionsRecieved/:recievedMobile", AuthVerification.verifyBoth, indexRecievedTransactions);
    route.get("/transactions/:id", AuthVerification.verifyBoth, showTransaction);
    route.post("/transactions", AuthVerification.verifyBoth, createTransaction);
}

export default transactionHandlers;
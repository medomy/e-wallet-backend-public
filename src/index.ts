import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser = require('body-parser');
import apiRoute from './routes';
import { connectToDb } from './db';
import usersHandler from './handlers/user';
import v1Route from './routes/v1/v1Route';
import transactionHandlers from './handlers/transaction';

dotenv.config();
const port = Number(process.env.PORT);
const app = express();
const address: string = `http://localhost:${port}`;

app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to E-wallet api , start using /api to work it out")
})
// set up your routes
app.use("/api", apiRoute);
// use handlers
usersHandler(v1Route);
transactionHandlers(v1Route);
app.listen(port, () => {
    console.log(`server is opened at : ${address}`);
    // connection 
    connectToDb();
})
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require("body-parser");
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./db");
const user_1 = __importDefault(require("./handlers/user"));
const v1Route_1 = __importDefault(require("./routes/v1/v1Route"));
const transaction_1 = __importDefault(require("./handlers/transaction"));
dotenv_1.default.config();
const port = Number(process.env.PORT);
const app = (0, express_1.default)();
const address = `http://localhost:${port}`;
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Welcome to E-wallet api , start using /api to work it out");
});
// set up your routes
app.use("/api", routes_1.default);
// use handlers
(0, user_1.default)(v1Route_1.default);
(0, transaction_1.default)(v1Route_1.default);
app.listen(port, () => {
    console.log(`server is opened at : ${address}`);
    // connection 
    (0, db_1.connectToDb)();
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1Route = express_1.default.Router();
v1Route.get("", (req, res) => {
    res.send("you can now use the api routes");
});
exports.default = v1Route;

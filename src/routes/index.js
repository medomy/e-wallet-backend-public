"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1Route_1 = __importDefault(require("./v1/v1Route"));
const apiRoute = express_1.default.Router();
apiRoute.get("", (req, res) => {
    res.send("go to /v1 to begin");
});
apiRoute.use("/v1", v1Route_1.default);
exports.default = apiRoute;

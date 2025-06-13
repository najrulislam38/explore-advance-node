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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../config/mongodb");
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("welcome");
});
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db("practice");
    const collection = yield db.collection("test");
    const cursor = collection.find({ age: { $gt: 18, $lt: 30 } }, { projection: { age: 1 }, sort: { age: 1 } });
    const data = yield cursor.toArray();
    res.json(data);
}));
exports.default = app;

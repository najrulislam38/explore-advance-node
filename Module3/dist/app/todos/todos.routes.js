"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const filePath = path_1.default.join(__dirname, "./../../../db/todo.js");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get("/", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
exports.todosRouter.post("/create-todo", (req, res) => {
    const data = req.body;
    console.log(data);
    res.send("Hello World");
});
exports.todosRouter.get("/:title", (req, res) => {
    console.log("from Query:", req.query);
    console.log("From Params:", req.params);
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // res.send(data);
    res.json(data);
});
exports.todosRouter.put("/update-todo/:title", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send("Update successful");
});
// todosRouter.patch("/", () => {});
exports.todosRouter.delete("/delete-todo/:title", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send("deleted successfully");
});

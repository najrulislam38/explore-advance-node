"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "./../../db/todo.js");
// middleware
app.use(express_1.default.json());
const todosRouter = express_1.default.Router();
app.use("/", todosRouter);
app.get("/", (req, res) => {
    res.send("Welcome to here.");
});
// app.get("/todos", (req: Request, res: Response) => {
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });
//   // res.send(data);
//   res.json(data);
// });
todosRouter.get("/todos", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
// app.get("/todos/:title", (req: Request, res: Response) => {
//   console.log("from Query:", req.query);
//   console.log("From Params:", req.params);
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });
//   // res.send(data);
//   res.json(data);
// });
todosRouter.get("/todos/:title", (req, res) => {
    console.log("from Query:", req.query);
    console.log("From Params:", req.params);
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // res.send(data);
    res.json(data);
});
app.post("/todos/create-todo", (req, res) => {
    const data = req.body;
    console.log(data);
    res.send("Hello World");
});
exports.default = app;
// app - express.json() - app router - get, post, patch, delete.
/**
 * Basic file structure.
 *
 * server -> server handling like = starting, closing, error handling of server, only related to server.
 * app file -> routing handling, middleware, route related error handling
 * app folder -> app business logic handling like create read update delete database related works.
 */

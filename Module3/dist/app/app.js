"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const todos_routes_1 = require("./todos/todos.routes");
// middleware
app.use(express_1.default.json());
app.use("/todos", todos_routes_1.todosRouter);
// app.get("/todos", (req: Request, res: Response) => {
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });
//   // res.send(data);
//   res.json(data);
// });
// app.get("/todos/:title", (req: Request, res: Response) => {
//   console.log("from Query:", req.query);
//   console.log("From Params:", req.params);
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });
//   // res.send(data);
//   res.json(data);
// });
exports.default = app;
// app - express.json() - app router - get, post, patch, delete.
/**
 * Basic file structure.
 *
 * server -> server handling like = starting, closing, error handling of server, only related to server.
 * app file -> routing handling, middleware, route related error handling
 * app folder -> app business logic handling like create read update delete database related works.
 */

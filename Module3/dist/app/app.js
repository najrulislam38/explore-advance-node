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
const app = (0, express_1.default)();
const todos_routes_1 = require("./todos/todos.routes");
// middleware
app.use(express_1.default.json());
app.use("/todos", todos_routes_1.todosRouter);
app.get("/", (req, res, next) => {
    console.log({
        url: req.url,
        method: req.method,
        header: req.header,
    });
    next();
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   console.log(something);
        res.json({
            message: "Welcome to the todos app.",
        });
    }
    catch (error) {
        next(error);
    }
}));
app.get("/error", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            message: "Welcome to the todos app.",
        });
    }
    catch (error) {
        next(error);
    }
}));
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found.",
    });
});
// global error always writing down in the file.
app.use((error, req, res, next) => {
    if (error) {
        res.json({
            message: "Something went wrong from global error handler",
        });
    }
});
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

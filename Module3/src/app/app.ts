import express, { Application, Request, Response } from "express";
const app: Application = express();
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "./../../db/todo.js");

// middleware
app.use(express.json());

const todosRouter = express.Router();

app.use("/", todosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to here.");
});

// app.get("/todos", (req: Request, res: Response) => {
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });

//   // res.send(data);
//   res.json(data);
// });

todosRouter.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});

// app.get("/todos/:title", (req: Request, res: Response) => {
//   console.log("from Query:", req.query);
//   console.log("From Params:", req.params);

//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });

//   // res.send(data);
//   res.json(data);
// });

todosRouter.get("/todos/:title", (req: Request, res: Response) => {
  console.log("from Query:", req.query);
  console.log("From Params:", req.params);

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });

  // res.send(data);
  res.json(data);
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  res.send("Hello World");
});

export default app;

// app - express.json() - app router - get, post, patch, delete.

/**
 * Basic file structure.
 *
 * server -> server handling like = starting, closing, error handling of server, only related to server.
 * app file -> routing handling, middleware, route related error handling
 * app folder -> app business logic handling like create read update delete database related works.
 */

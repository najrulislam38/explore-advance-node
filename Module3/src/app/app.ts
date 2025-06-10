import express, { Application, Request, Response } from "express";
const app: Application = express();
import { todosRouter } from "./todos/todos.routes";

// middleware
app.use(express.json());

app.use("/todos", todosRouter);

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

export default app;

// app - express.json() - app router - get, post, patch, delete.

/**
 * Basic file structure.
 *
 * server -> server handling like = starting, closing, error handling of server, only related to server.
 * app file -> routing handling, middleware, route related error handling
 * app folder -> app business logic handling like create read update delete database related works.
 */

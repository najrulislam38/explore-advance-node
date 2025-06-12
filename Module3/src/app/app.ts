import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import { todosRouter } from "./todos/todos.routes";

// middleware
app.use(express.json());

app.use("/todos", todosRouter);

app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log({
      url: req.url,
      method: req.method,
      header: req.header,
    });
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   console.log(something);
      res.json({
        message: "Welcome to the todos app.",
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get("/error", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: "Welcome to the todos app.",
    });
  } catch (error) {
    next(error);
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

// global error always writing down in the file.
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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

export default app;

// app - express.json() - app router - get, post, patch, delete.

/**
 * Basic file structure.
 *
 * server -> server handling like = starting, closing, error handling of server, only related to server.
 * app file -> routing handling, middleware, route related error handling
 * app folder -> app business logic handling like create read update delete database related works.
 */

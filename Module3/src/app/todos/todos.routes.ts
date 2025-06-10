import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const filePath = path.join(__dirname, "./../../../db/todo.js");

export const todosRouter = express.Router();

todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});

todosRouter.post("/create-todo", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  res.send("Hello World");
});

todosRouter.get("/:title", (req: Request, res: Response) => {
  console.log("from Query:", req.query);
  console.log("From Params:", req.params);

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });

  // res.send(data);
  res.json(data);
});
todosRouter.put("/update-todo/:title", (req: Request, res: Response) => {
  const { title, body } = req.body;

  console.log(title, body);
  res.send("Update successful");
});
// todosRouter.patch("/", () => {});
todosRouter.delete("/delete-todo/:title", (req: Request, res: Response) => {
  const { title, body } = req.body;

  console.log(title, body);
  res.send("deleted successfully");
});

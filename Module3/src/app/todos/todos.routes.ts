import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";

const filePath = path.join(__dirname, "./../../../db/todo.js");

export const todosRouter = express.Router();

todosRouter.get("/", async (req: Request, res: Response) => {
  // const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // res.json(data);

  const db = await client.db("todosDB");

  const collection = await db.collection("todos");

  const cursor = collection.find({});
  const todos = await cursor.toArray();

  res.json(todos);
});

todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  // const data = req.body;
  // console.log(data);
  // res.send("Hello World");

  const { title, description, priority } = req.body;

  // console.log(title, description, priority);

  const db = await client.db("todosDB");

  const collection = await db.collection("todos");
  await collection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false,
  });

  const cursor = collection.find({});
  const todos = cursor.toArray();

  res.json(todos);
});

// params and query
todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  // console.log("from Query:", req.query);
  // console.log("From Params:", req.params);

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const todo = await collection.findOne({ _id: new ObjectId(id) });

  // res.send(data);
  res.json(todo);
});

todosRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const filter = { _id: new ObjectId(id) };

  const { title, description, priority, isCompleted } = req.body;

  const updatedTodo = await collection.updateOne(
    filter,
    { $set: { title, description, priority, isCompleted } },
    { upsert: true }
  );

  res.send(updatedTodo);
});
// todosRouter.patch("/", () => {});

// delete
todosRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  // const { title, body } = req.body;
  const id = req.params.id;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  await collection.deleteOne({ _id: new ObjectId(id) });

  res.send({
    message: "deleted successful",
  });
});

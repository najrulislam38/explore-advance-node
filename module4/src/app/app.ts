import express, { Application, Request, Response } from "express";
import { client } from "../config/mongodb";

const app: Application = express();

//middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome");
});

app.get("/test", async (req: Request, res: Response) => {
  const db = await client.db("practice");
  const collection = await db.collection("test");

  const cursor = collection.find(
    { age: { $gt: 18, $lt: 30 } },
    { projection: { age: 1 }, sort: { age: 1 } }
  );
  const data = await cursor.toArray();
  res.json(data);
});

export default app;

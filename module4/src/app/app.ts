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

  // Explicit $ and
  // const cursor = await collection.find(
  //   {
  //     $and: [
  //       {
  //         age: { $gte: 18 },
  //       },
  //       {
  //         age: { $ne: 20 },
  //       },
  //       {
  //         age: { $lte: 30 },
  //       },
  //     ],
  //   },
  //   { projection: { age: 1 }, sort: { age: 1 } }
  // );

  // Explicit $ or
  // const cursor = await collection.find(
  //   {
  //     $or: [{ interests: "Cooking" }, { interests: "Travelling" }],
  //   },
  //   { projection: { interests: 1 }, sort: { interests: 1 } }
  // );

  // operator $in
  const cursor = await collection.find(
    {
      interests: { $in: ["Cooking", "Gaming"] },
    },
    { projection: { interests: 1 }, sort: { interests: 1 } }
  );

  const result = await cursor.toArray();

  res.json(result);
});

export default app;

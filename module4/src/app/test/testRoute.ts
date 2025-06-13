import express, { Request, Response } from "express";

import { client } from "../../config/mongodb";
import app from "../app";

app.get("/test", (req: Request, res: Response) => {
  res.send("Right path");
});

// app.get("/test", async (req: Request, res: Response) => {
//   //   const db = await client.db("practice");
//   //   const collection = await db.collection("test");

//   console.log("hit hoge gese");
//   res.send("hit hoyese");

//   //   const cursor = collection.find({});
//   //   const data = await cursor.toArray();
//   //   res.json(data);
// });

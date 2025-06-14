import express, { Application, Request, Response } from "express";
import { client } from "../config/mongodb";
import { ObjectId } from "mongodb";

const app: Application = express();

//middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome");
});

app.get("/test/:id", async (req: Request, res: Response) => {
  const db = await client.db("practice");
  const collection = await db.collection("test");
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  // const updateData = {
  //   $set: { interests: ["Gaming", "Reading", "Writing"] },
  // };
  // const updateData = {
  //   $addToSet: { interests: { $each: ["Reading", "Writing", "Traveling"] } },
  // }; // duplicate data not insert in the array
  const updateData = {
    $push: { interests: { $each: ["Reading", "Writing"] } },
  };

  const result = await collection.findOne(query);
  // const result = await collection.updateOne(query, updateData);
  res.send(result);

  // $ALL AND $ELEMMATCH operator use case
  // const result = await collection
  //   .find(
  //     // { interests: { $all: ["Travelling", "Cooking", "Gaming"] } }, // use $all operator
  //     {
  //       skills: {
  //         $elemMatch: {
  //           name: "JAVASCRIPT",
  //           level: "Expert",
  //         },
  //       },
  //     }, // $elemMatch operator use case
  //     { projection: { skills: 1 } }
  //   )
  //   .toArray();

  // res.send(result);

  // exists, type and size operator use case
  // const result = await collection
  //   // .find({ friends: { $size: 3 } }) size operator
  //   // .find({ company: { $type: "null" } }) // type operator
  //   .find({ friends: { $exists: true } }) // exists operator
  //   .toArray();
  // res.send(result);

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
  //   const cursor = await collection.find(
  //     {
  //       interests: { $in: ["Cooking", "Gaming"] },
  //     },
  //     { projection: { interests: 1 }, sort: { interests: 1 } }
  //   );

  //   const result = await cursor.toArray();

  //   res.json(result);
});

export default app;

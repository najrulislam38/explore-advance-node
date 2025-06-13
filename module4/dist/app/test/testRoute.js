"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
app_1.default.get("/test", (req, res) => {
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

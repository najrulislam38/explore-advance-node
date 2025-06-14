"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("welcome");
});
app.get("/test/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db("practice");
    const collection = yield db.collection("test");
    const id = req.params.id;
    const query = { _id: new mongodb_2.ObjectId(id) };
    // const updateData = {
    //   $set: { interests: ["Gaming", "Reading", "Writing"] },
    // };
    // const updateData = {
    //   $addToSet: { interests: { $each: ["Reading", "Writing", "Traveling"] } },
    // }; // duplicate data not insert in the array
    const updateData = {
        $push: { interests: { $each: ["Reading", "Writing"] } },
    };
    const result = yield collection.findOne(query);
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
}));
exports.default = app;

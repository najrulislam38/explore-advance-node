const { log } = require("console");
const fs = require("fs");

console.log("task 1");

const text = "Learning file system";

fs.writeFileSync("./hello.txt", text);

console.log("task 3");

const data = fs.readFileSync("./hello.txt", { encoding: "utf-8" });

console.log(data);
console.log("task 4");

const fs = require("fs");

let text = "Tutorial of Node.js";

console.log("task 1");

// write file
fs.writeFile("./hello.txt", text, { encoding: "utf-8" }, (err) => {
  if (err) {
    console.log("Error from write file", err);
    return;
  }

  console.log("file written successfully.");
});

console.log("task 3");

// read file
fs.readFile("./hello.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("Something went wrong.");
    return;
  }

  console.log(data);
});

console.log("task 5");

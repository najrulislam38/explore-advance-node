const fs = require("fs");

// create read stream
const reamStream = fs.createReadStream("./hello-world.txt", {
  encoding: "utf-8",
});

// create write stream
const writeStream = fs.createWriteStream("./hello.txt", { encoding: "utf-8" });

reamStream.on("data", (data) => {
  console.log(data);

  writeStream.write(data, (err) => {
    if (err) {
      throw Error("Error", err);
    }
  });
});

reamStream.on("error", (error) => {
  if (error) {
    throw Error("Error", error);
  }
});

// writeStream.on("error", (error) => {
//   if (error) {
//     throw Error("Error", error);
//   }
// });

reamStream.on("end", () => {
  console.log("reading ended.");
  writeStream.end();
});

writeStream.on("finish", () => {
  console.log("write stream finish successfully.");
});

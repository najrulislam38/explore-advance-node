const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./db/todo.json");

// const data = [
//   {
//     title: "Next.js",
//     body: "learning Next.js",
//     createdAT: "5/21/2025 10:10:30 PM",
//   },
//   {
//     title: "Nodejs",
//     body: "learning Advance Node",
//     createdAT: "5/21/2025 10:12:30 PM",
//   },
// ];

const server = http.createServer((req, res) => {
  // get todos
  if (req.url === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(201, {
      "content-type": "application/json", // text/plain, text/html, anything
      email: "example@gmail.com",
    });

    // Alternative
    // res.setHeader("content-type", "text/plain");
    // res.setHeader("email", "hero@gmail.com");
    // res.statusCode = 201;
    res.end(data);

    // post todo
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    const data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {});

    res.end("Todo Created.");
  } else {
    res.end("ToDos Not Found.");
  }

  console.log(req.url, req.method);
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Server Listening");
});

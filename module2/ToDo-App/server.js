const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    res.end("All ToDos");
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    res.end("Todo Created.");
  } else {
    res.end("ToDos Not Found.");
  }

  console.log(req.url, req.method);
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Server Listening");
});

const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url?.pathname;
  // console.log(url, "url");

  // get todos
  if (pathname === "/todos" && req.method === "GET") {
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
  }

  // get single todo
  else if (pathname === "/todo" && req.method === "GET") {
    const title = url.searchParams.get("title");
    // console.log(title);
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(data);

    const todo = parseData.find((todo) => todo?.title === title);
    // console.log("Todo match: ", todo);

    const stringifyTodo = JSON.stringify(todo);

    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(stringifyTodo);
  }

  // post todo
  else if (pathname === "/todos/create-todo" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      // console.log(data);

      // const todo = JSON.parse(data);
      // console.log(todo);
      const { title, body } = JSON.parse(data);

      console.log({ title, body });
      const createdAt = new Date().toLocaleString();

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseAllTodos = JSON.parse(allTodos);
      // console.log(parseAllTodos);

      parseAllTodos.push({ title, body, createdAt });

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });
      res.end(JSON.stringify({ title, body, createdAt }, null, 2));
    });
  }

  // update todo -> use patch method
  else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const title = url.searchParams.get("title");
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      const { body } = JSON.parse(data);

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseAllTodos = JSON.parse(allTodos);
      // console.log(parseAllTodos);

      const todoIndex = parseAllTodos.findIndex((todo) => todo.title === title);

      parseAllTodos[todoIndex].body = body;

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });
      res.end(
        JSON.stringify(
          { title, body, createdAt: parseAllTodos[todoIndex].createdAt },
          null,
          2
        )
      );
    });
  }

  // delete todo -> use delete method
  else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
    const title = url.searchParams.get("title");
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(data);

    const filterData = parseData.filter((todo) => todo?.title !== title);
    // console.log(filterData);

    fs.writeFileSync(filePath, JSON.stringify(filterData, null, 2), {
      encoding: "utf-8",
    });

    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ message: "Todos Data deleted successful." }));
    // fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
    //     encoding: "utf-8",
    //   });
    //   res.end(JSON.stringify({ title, body, createdAt }, null, 2));
  }

  // wrong route
  else {
    res.end("ToDos Not Found.");
  }

  // console.log(req.url, req.method);
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✔ Server Listening");
});

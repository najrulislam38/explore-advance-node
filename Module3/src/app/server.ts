import app from "./app";
import { client } from "../config/mongodb";
const PORT = 5000;

let server;

const bootstrap = async () => {
  await client.connect();
  console.log("mongodb connected.");

  server = app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT} port`);
  });
};

bootstrap();

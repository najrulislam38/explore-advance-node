import app from "./app";
const PORT = 5000;

let server;

const bootstrap = async () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT} port`);
  });
};

bootstrap();

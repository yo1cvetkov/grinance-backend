import express from "express";

const bootstrap = async () => {
  const app = express();

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port http://localhost:${process.env.PORT}`);
  });
};

bootstrap();

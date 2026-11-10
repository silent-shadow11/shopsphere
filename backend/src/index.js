import dotenv from "dotenv";
import { app } from "./app.js";
import Connectdb from "./db/index.js";

dotenv.config({
  path: "./.env",
});

Connectdb()
  .then(() => {
    const port = process.env.PORT || 7000;
    app.listen(port, () => {
      console.log(`Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection failed !!!", err);
  });

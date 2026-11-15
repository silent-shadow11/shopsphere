import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js"

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"))

app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)

export { app };

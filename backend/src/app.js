import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import categoryRouter from "./routes/category.routes.js";
import orderRouter from "./routes/order.routes.js";
import cartRouter from "./routes/cart.route.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/admin/category", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartRouter);

export { app };

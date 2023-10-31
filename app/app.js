import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import productsRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRouter.js";
import colorRouter from "../routes/colorRouter.js";

//db connect
dbConnect();
const app = express();

//pass incoming data
app.use(express.json());
// routes
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productsRouter);
app.user("/api/v1/categories/", categoriesRouter);
app.user("/api/v1/brands/", brandsRouter);
app.user("/api/v1/color/", colorRouter);
//err middleware
app.use(notFound);
app.use(globalErrHandler);
export default app;
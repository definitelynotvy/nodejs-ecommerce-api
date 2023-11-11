import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createOderCtrl } from "../controllers/orderCtrl.js";

const orderRouter = express.Router();
orderRouter.post('/', isLoggedIn, createOderCtrl);
export default orderRouter;


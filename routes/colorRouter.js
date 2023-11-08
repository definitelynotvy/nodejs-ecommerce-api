import exppress from "express";
import {
  createColorCtrl,
  deleteColorCtrl,
  getAllColorsCtrl,
  getSingleColorCtrl,
  updateColorCtrl,
} from "../controllers/colorsCtrl.js";
// import isAdmin from "../middlewares/isAdmin.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const colorRouter = exppress.Router();

// isAdmin;
// colorRouter.post("/", isLoggedIn, isAdmin, createColorCtrl);
colorRouter.post("/", isLoggedIn, createColorCtrl);
colorRouter.get("/", getAllColorsCtrl);
colorRouter.get("/:id", getSingleColorCtrl);
// colorRouter.delete("/:id", isLoggedIn, isAdmin, deleteColorCtrl);
// colorRouter.put("/:id", isLoggedIn, isAdmin, updateColorCtrl);
colorRouter.delete("/:id", deleteColorCtrl);
colorRouter.put("/:id", updateColorCtrl);

export default colorRouter;
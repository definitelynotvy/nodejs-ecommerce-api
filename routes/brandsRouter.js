import exppress from "express";
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  updateBrandCtrl,
} from "../controllers/brandsCtrl.js";
// import isAdmin from "../middlewares/isAdmin.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const brandsRouter = exppress.Router();

//brandsRouter.post("/", isLoggedIn, isAdmin, createBrandCtrl);
brandsRouter.post("/", isLoggedIn, createBrandCtrl);
brandsRouter.get("/", getAllBrandsCtrl);
brandsRouter.get("/:id", getSingleBrandCtrl);
// brandsRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrandCtrl);
// brandsRouter.put("/:id", isLoggedIn, isAdmin, updateBrandCtrl);
brandsRouter.delete("/:id", deleteBrandCtrl);
brandsRouter.put("/:id", updateBrandCtrl);
export default brandsRouter;
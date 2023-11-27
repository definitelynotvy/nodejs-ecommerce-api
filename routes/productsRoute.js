import express from "express";
import { 
    createProductCtrl, 
    getProductsCrtl, 
    getProductCrtl,
    updateProductCrtl,
    deleteProductCrtl
} from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const productsRouter = express.Router();

productsRouter.post("/", isLoggedIn, isAdmin, upload.array("files"), createProductCtrl );
productsRouter.get("/", getProductsCrtl );
productsRouter.get("/:id", getProductCrtl );
productsRouter.put("/:id", isLoggedIn, isAdmin ,updateProductCrtl );
productsRouter.delete("/:id/delete", isLoggedIn, isAdmin, deleteProductCrtl );

export default productsRouter;
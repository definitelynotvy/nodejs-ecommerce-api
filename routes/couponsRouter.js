import exppress from "express";
import { createCouponCtrl,getAllCouponsCtrl,getCouponCtrl,updateCouponCtrl,deleteCouponCtrl } from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";


const couponRouter = exppress.Router();

couponRouter.post("/",isLoggedIn, isAdmin, createCouponCtrl);

couponRouter.get("/", getAllCouponsCtrl);

couponRouter.get("/single?", getCouponCtrl);

couponRouter.put("/update/:id", isLoggedIn, isAdmin, updateCouponCtrl);

couponRouter.delete("/delete/:id", deleteCouponCtrl);

export default couponRouter;
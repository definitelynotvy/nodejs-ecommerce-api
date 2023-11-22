import exppress from "express";
import { createCouponCtrl,getAllCouponsCtrl,getCouponCtrl,updateCouponCtrl,deleteCouponCtrl } from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const couponRouter = exppress.Router();

couponRouter.post("/",isLoggedIn, createCouponCtrl);

couponRouter.get("/", getAllCouponsCtrl);

couponRouter.get("/:id", getCouponCtrl);

couponRouter.put("/update/:id", updateCouponCtrl);

couponRouter.delete("/delete/:id", deleteCouponCtrl);

export default couponRouter;
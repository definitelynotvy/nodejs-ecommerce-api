import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
//@desc create orders
//@route POST /api/v1/orders
//@access private
import User from "../model/User.js";
import Product from "../model/Product.js";

export const createOderCtrl = asyncHandler(async (req, res)=>{
   //Get the payload(customer, orderItem,ShippingAddress, totalPrice)
   const {orderItems, shippingAddress, totalPrice } = req.body;
   console.log({
      orderItems,
      shippingAddress,
      totalPrice,
   });
   //Find the user
   const user = await User.findById(req.userAuthId);
   //Check if user has shipping address
   if(!user?.hasShippingAddress){
      throw new Error("Please provide shipping address");
   }
   //Check if order is not empty
   if(orderItems?.length <=0){
      throw new Error("No order Items");
   }
   //Place/create order - Save into DB
   const order = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      totalPrice,
   });
   //Update the product qty
   const products = await Product.find({_id:{$in:orderItems}});
   orderItems?.map(async(order)=>{
      const product = products?.find((product)=>{
         return product?._id?.toString() === order?._id?.toString();
      });
      if(product){
         product.totalSold += order.qty;
      }
      await product.save();
   });
   //push order into user
   user.orders.push(order?._id);
   await user.save();
   //make payment (stripe)
   //payment webhook
   //update the user order
   res.json({
      success: true,
      message: "Order created",
      order,
      user,
   })
});
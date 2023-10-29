import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

// @desc Create new product
// @route POST /api/v1/products
//  @access Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
  const {name,description,category,size,color,user,price,totalQty,brand,
  } = req.body;
  //Product exists
  const productExists = await Product.findOne({name});
  if(productExists){
    throw new Error("Product Already Exists");
  }
  //create the product
  const product = await Product.create({
    name,
    description,
    category,
    size,
    color,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });
  //push the product into category
  //send respond
  res.json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

// @desc Get all product
// @route GET /api/v1/products
//  @access Public

export const getProductsCrtl = asyncHandler(async(req, res) => {
    console.log(req.query);
    //query
    let productQuery = Product.find()

    //search by name
    if (req.query.name) {
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: "i"},
        });
    }
    //filter by brand
    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: "i"},
        });
    }
    //filter by category
    if (req.query.category) {
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: "i"},
        });
    }
    //filter by color
    if (req.query.color) {
        productQuery = productQuery.find({
            colors: { $regex: req.query.color, $options: "i"},
        });
    }
    //filter by size
    if (req.query.size) {
        productQuery = productQuery.find({
            sizes: { $regex: req.query.size, $options: "i"},
        });
    }
    //filter by price range
    if (req.query.price){
        const priceRange = req.query.price.split("-");
        //gte: greater than or equal
        //lte: less than or equal
        productQuery = productQuery.find({
            price:{$gte: priceRange[0], $lte: priceRange[1]},
        });
    }
    //pagination
    //page
    const page = parseInt(req.query.page) ? parseInt(req.query.page):1;
    //limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit):10;
    //startIdx
    const startIndex = (page - 1)*limit;
    //endIdx
    const endIndex = page*limit;
    //total
    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    //pagination results
    const pagination = {};
    if (endIndex <  total){
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }
    //await the query
    const products = await productQuery;

    res.json({
        status: "success",
        total,
        result: products.length,
        pagination,
        message: "Products fetched successfully",
        products,
    });
});

// @desc Get single product
// @route GET /api/v1/products/:id
//  @access Public

export const getProductCrtl = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        throw new Error("Product not found");
    }
    res.json({
        status: "success",
        message: "Product fetched successfully",
        product,
    });
});

// @desc update product
// @route PUT /api/v1/products/:id/update
//  @access Private/Admin

export const updateProductCrtl = asyncHandler(async(req, res) => {
    const {name,description,category,size,color,user,price,totalQty,brand,
    } = req.body;
    //update
    const product = await Product.findByIdAndUpdate(req.params.id, {name,description,category,size,color,user,price,totalQty,brand,
    }, {
        new: true,
    });
    res.json({
        status: "success",
        message: "Product updated successfully",
        product,
    });
});

// @desc Delete product
// @route DELETE /api/v1/products/:id/delete
//  @access Private/Admin

export const deleteProductCrtl = asyncHandler(async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Product deleted successfully",
    });
});
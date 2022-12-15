const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ProductModel } = require("../models/product.model");
const { userModel } = require("../models/user.model");

const ProductRouter = Router();

ProductRouter.get("/", async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        const products = await ProductModel.find();
        res.send(products);
    } else {
        res.send("Please login First")
    }
});

ProductRouter.post("/create", async (req, res) => {
    const { email, title, quantity, priority, description } = req.body;
    console.log(email)
    const user = await userModel.findOne({ email });
    if (user) {
        const newProd = new ProductModel({
            email,
            title,
            quantity,
            priority,
            description,
        });
        try {
            await newProd.save();
            res.send("Product Created");
        } catch (err) {
            res.send("something went wrong");
            console.log(err);
        }
    } else {
        res.send("Please login First")
    }
});


ProductRouter.delete("/delete/:id", async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    const user = await userModel.findOne({ userId });
    if (user) {
        const product = ProductModel.id(id);
        product.remove();
        await product.save();
        console.log(user);
        res.send({ msg: `Product Deleted Successfully`, user: user });
    } else {
        res.send("Please login First")
    }
})

module.exports = {
    ProductRouter,
};

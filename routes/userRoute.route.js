const { Router } = require("express")
const { userModel } = require("../models/user.model")
const { BookmarkModel } = require("../models/user.model")

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { authentication } = require("../middlewares/Authentication")
require('dotenv').config()
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    let { name, email, password } = req.body
    try {
        let user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(409).send("Already Registered, Please Login")
        }
        else {
            bcrypt.hash(password, 6, async function (err, hash) {
                if (err) {
                    res.send({ "Error": "Something wrong" })
                    console.log(err);
                } else {
                    const newUser = new userModel({ name, email, password: hash })
                    await newUser.save()
                    res.send({ "message": "Succesfully Registered" })
                }
            })
        }
    } catch (err) {
        return res.status(401).send(e.message)
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email })
    let hash = user.password
    bcrypt.compare(password, hash, async function (err, result) {
        if (user && result) {
            var token = jwt.sign({ email: email }, process.env.PRIVATE_KEY);
            res.send({
                message: "Login Successful",
                token
            })
        } else {
            res.status(400).send({ "Error": "Something Error" })
        }
    })
})
userRouter.get("/bookmarks", authentication, async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        const bookmarks = user.bookmarks;
        res.send(bookmarks);
    } else {
        res.send("Please login First")
    }
})

userRouter.post("/bookmarks", authentication, async (req, res) => {
    const { email, title, quantity, priority, description } = req.body;
    console.log(email)
    const user = await userModel.findOne({ email });
    const newBProd = new BookmarkModel({
        email,
        title,
        quantity,
        priority,
        description,
    });
    console.log(newBProd);
    console.log(user.bookmarks)
    user.bookmarks.push(newBProd);
    await user.save();
    res.send({ msg: "Product Created", bookmarks: user.bookmarks });
})

userRouter.delete("/bookmarks/:id", authentication, async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    const user = await userModel.findOne({ email });
    if (user) {
        const bookmarks = user.bookmarks.id(id);
        bookmarks.remove();
        await user.save();
        console.log(user);
        res.send({ msg: `Product Deleted Successfully`, user: user });
    } else {
        res.send("Please login First")
    }
})

module.exports = {
    userRouter
}
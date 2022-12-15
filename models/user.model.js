const mongoose = require("mongoose")
const bookmarkSchema = new mongoose.Schema({
    email: { type: String, require: true },
    title: { type: String, require: true },
    quantity: { type: Number, require: true },
    priority: { type: Number, require: true },
    description: { type: String, require: true },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    bookmarks: [bookmarkSchema]
})

const userModel = mongoose.model("user", userSchema)
const BookmarkModel = mongoose.model("bookmarks", bookmarkSchema)

module.exports = {
    userModel, BookmarkModel
}
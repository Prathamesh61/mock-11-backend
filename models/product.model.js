const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  email: { type: String, require: true },
  title: { type: String, require: true },
  quantity: { type: Number, require: true },
  priority: { type: Number, require: true },
  description: { type: String, require: true },
}, { timestamps: true });

const ProductModel = mongoose.model("Products", productSchema);

module.exports = {
  ProductModel,
};

import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  discountPrice: { type: Number },
  features: [{ type: String }],
});

export default model("Product", ProductSchema);

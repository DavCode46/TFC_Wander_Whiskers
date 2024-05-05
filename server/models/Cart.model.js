import { model, Schema } from "mongoose";

const CartSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default model("Cart", CartSchema);

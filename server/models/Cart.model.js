import { model, Schema } from "mongoose";

const CartSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

export default model("Cart", CartSchema);

import Order from "../models/Order.model.js";
const getOrders = async (req, res, next) => {
    try {
      const user = req.params.id
      const orders = await Order.find({user}).sort({ updatedAt: -1 });
  
      res.status(200).json(orders);
    } catch (err) {
      next(new ErrorModel(err));
    }
  };

  export { getOrders } 
  
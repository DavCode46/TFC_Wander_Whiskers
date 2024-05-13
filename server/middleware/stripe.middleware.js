import Product from "../models/Product.model.js";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const {
  SECRET_STRIPE_KEY,
  CLIENT_URL_SUCCESS,
  CLIENT_URL_CANCEL,
  STRIPE_MONTHLY_SUBSCRIPTION,
  STRIPE_ANNUAL_SUBSCRIPTION,
} = process.env;
const stripe = new Stripe(SECRET_STRIPE_KEY);
console.log('CLIENT_URL_SUCCESS',CLIENT_URL_SUCCESS)
console.log('CLIENT_URL_CANCEL',CLIENT_URL_CANCEL)
const stripeMiddleware = async (req, res, next) => {
  const userId = req.params.id; // Asegúrate de utilizar req.body si el userId está en el cuerpo de la solicitud
    
  try {
    const user = await User.findById(userId).populate("cart");
console.log(user)
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crear un array para almacenar los IDs de productos del carrito
    const productIds = user.cart.flatMap((cartItem) => cartItem.products);

    // Iterar sobre los IDs de productos y procesarlos uno por uno
    for (const productId of productIds) {
      try {
        const product = await Product.findById(productId);

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card", "paypal"],
          line_items: [
            {
              price:
                product.name === "Mensual"
                  ? STRIPE_MONTHLY_SUBSCRIPTION
                  : STRIPE_ANNUAL_SUBSCRIPTION,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${CLIENT_URL_SUCCESS}`,
          cancel_url: `${CLIENT_URL_CANCEL}`,
        });

        req.stripeSessionId = session.id;
        req.sessionUrl = session.url
       
        next();
      } catch (error) {
        console.error("Error al procesar el producto:", error);

        return next(new ErrorModel(error));
      }
    }

  } catch (error) {
    console.error("Error en el middleware de Stripe:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export default stripeMiddleware;

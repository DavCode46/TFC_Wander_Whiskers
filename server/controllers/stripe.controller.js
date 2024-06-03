
import Cart from '../models/Cart.model.js'
import User from '../models/User.model.js'
import Order from '../models/Order.model.js'
import Product from '../models/Product.model.js'
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);
const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      handleCheckoutSessionCompleted(session);
      break;
    // Other event types...
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

const handleCheckoutSessionCompleted = async (session) => {
  const userId = session.client_reference_id;
  const user = await User.findById(userId).populate("cart");

  if (!user) {
    console.error("Usuario no encontrado en el webhook");
    return;
  }

  for (const cartItem of user.cart) {
    for (const productId of cartItem.products) {
      const product = await Product.findById(productId);
      
      // Crea el pedido
      await Order.create({
        products: product,
        user: userId
      });
    }
  }

  // Vaciar el carrito y actualizar el usuario
  const cart = await Cart.findOne({ user: userId });
  await Cart.findByIdAndDelete(cart._id);
  user.cart = [];
  user.isSubscribed = true;
  await user.save();
};


export default stripeWebhook;

import Cart from "../models/Cart.model.js";
import User from "../models/User.model.js";
import ErrorModel from "../models/Error.model.js";
import Product from "../models/Products.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const {
  SECRET_STRIPE_KEY,
  CLIENT_URL_SUCCESS,
  CLIENT_URL_CANCEL,
  STRIPE_MONTHLY_SUBSCRIPTION,
  STRIPE_ANNUAL_SUBSCRIPTION,
} = process.env;
console.log("Secret stripe key", SECRET_STRIPE_KEY);
console.log('price', STRIPE_ANNUAL_SUBSCRIPTION)
console.log('success page', CLIENT_URL_SUCCESS)
console.log('cancel page', CLIENT_URL_CANCEL)
import Stripe from "stripe";

const stripe = new Stripe(SECRET_STRIPE_KEY);

const getProductsCart = async (req, res, next) => {
  // Get the products in the cart
  try {
    const userId = req.params.id;
    console.log(userId);
    const productsCart = await Cart.find({ user: userId });
    console.log("productsCart", productsCart);
    if (!productsCart)
      return next(new ErrorModel("No hay productos en el carro"));
    res.status(200).json(productsCart);
  } catch (err) {
    return next(new ErrorModel(err));
  }
};

const addProductCart = async (req, res, next) => {
  const userId = req.params.id;
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }

    // Agregar el ID del producto al array de productos en el carrito
    if (!cart.products.includes(productId)) {
      cart.products.push(productId);
      await cart.save();
      res.status(201).json({ message: 'Producto agregado al carrito' });
    } else {
      res.status(400).json({ message: 'El producto ya está en el carrito' });
    }
  } catch (error) {
    console.error(error);
    return next(new Error('Error al agregar el producto al carrito'));
  }
};


const updateProductCart = async (req, res, next) => {
  // Extraer el ID del usuario autenticado desde la solicitud
  const userId = req.user.id;

  // Extraer el ID del producto que se va a actualizar y los detalles actualizados del producto del cuerpo de la solicitud
  const { productId, updatedProduct } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorModel("Usuario no encontrado"));
    }

    // Buscar el índice del producto en el carrito del usuario
    const productIndex = user.cart.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return next(new ErrorModel("Producto no encontrado en el carrito"));
    }

    // Actualizar los detalles del producto en el carrito del usuario
    user.cart[productIndex].set(updatedProduct);

    // Guardar los cambios en el usuario (con el producto actualizado en el carrito)
    await user.save();

    // Responder con el producto actualizado en el carrito
    res.status(200).json({
      message: "Producto actualizado en el carrito",
      product: user.cart[productIndex],
    });
  } catch (error) {
    // Manejar errores
    console.error(error);
    return next(new ErrorModel(error));
  }
};

const deleteProductCart = async (req, res, next) => {
  // Extraer el ID del usuario autenticado desde la solicitud
  const userId = req.user.id;

  // Extraer el ID del producto que se va a eliminar del cuerpo de la solicitud
  const productId = req.params.productId;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorModel("Usuario no encontrado"));
    }

    // Filtrar el producto a eliminar del carrito del usuario
    user.cart = user.cart.filter(
      (product) => product._id.toString() !== productId
    );

    // Guardar los cambios en el usuario (con el producto eliminado del carrito)
    await user.save();

    // Responder con un mensaje de éxito
    res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    // Manejar errores
    console.error(error);
    return next(new ErrorModel(error));
  }
};

const checkout = async (req, res, next) => {
  const userId = req.params.id; // Obtener el ID del usuario desde la solicitud
  console.log("user id", userId);
  try {
    // Obtener el carrito del usuario
    const user = await User.findById(userId).populate("cart");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log("carrito de usuario", user.cart);
    // Crear un array de productos para el pago
    const lineItems = user.cart.map((product) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
          // images: [product.image],
        },
      },
      quantity: 1,
    }));
    

    // Crear una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: [
        {
          // ...lineItems,
          price: STRIPE_MONTHLY_SUBSCRIPTION,
          quantity: 1
        }
      ],

      mode: "subscription",
    success_url: `${CLIENT_URL_SUCCESS}`,
      cancel_url: `${CLIENT_URL_CANCEL}`,
      // payment_intent_data: {
      //   // currency: "eur",
      //   metadata: { userId: userId }, // Agregar metadatos relevantes, como el ID de usuario
      // },
    });
    console.log("session", session.id, session.url, session);

    const sessionId = session.id;
    console.log("sessionId", sessionId);

    // Limpiar el carrito del usuario después de la compra
    user.cart = [];
    user.subscriptionId = sessionId;
    await user.save();

    // Responder con la URL de redirección a la página de pago de Stripe
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    return next(new ErrorModel(error));
  }
};

export {
  getProductsCart,
  addProductCart,
  updateProductCart,
  deleteProductCart,
  checkout,
};

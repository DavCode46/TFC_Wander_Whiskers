import Cart from "../models/Cart.model.js";
import User from "../models/User.model.js";
import ErrorModel from "../models/Error.model.js";
import Product from "../models/Products.model.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);

const getProductsCart = async (req, res, next) => {
  // Get the products in the cart
  try {
    const userId = req.params.id;
    console.log(userId);
    const productsCart = await Cart.find({user: userId});
    console.log('productsCart', productsCart)
    if (!productsCart)
      return next(new ErrorModel("No hay productos en el carro"));
    res.status(200).json(productsCart);
  } catch (err) {
    return next(new ErrorModel(err));
  }
};

const addProductCart = async (req, res, next) => {
  // Extraer el ID del usuario autenticado desde la solicitud
  console.log("req.user", req.user);
  const userId = req.params.id;
  console.log("userId", userId);
  // Extraer los detalles del producto del cuerpo de la solicitud
  const { name, image, quantity, price } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return next(new ErrorModel("Usuario no encontrado"));
    }

    // Crear un nuevo documento de carrito con los detalles del producto
    const newProduct = await Cart.create({
      name,
      image,
      quantity,
      price,
      user,
    });

    // Guardar el producto en el carrito del usuario
    user.cart.push(newProduct);

    // Guardar los cambios en el usuario (con el nuevo producto en el carrito)
    await user.save();

    // Responder con el producto agregado al carrito
    res
      .status(201)
      .json({ message: "Producto agregado al carrito", product: newProduct });
  } catch (error) {
    // Manejar errores
    console.error(error);
    return next(new ErrorModel(error));
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
  const userId = req.body.userId; // Obtener el ID del usuario desde la solicitud
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
          images: [product.image],
        },
        unit_amount: product.price * 100, // Precio en centavos
      },
      quantity: product.quantity,
    }));

    // Crear una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
      payment_intent_data: {
        // currency: "eur",
        metadata: { userId: userId }, // Agregar metadatos relevantes, como el ID de usuario
      },
    });

    // Limpiar el carrito del usuario después de la compra
    user.cart = [];
    await user.save();

    // Responder con la URL de redirección a la página de pago de Stripe
    res.status(200).json({ redirectUrl: session.url });
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

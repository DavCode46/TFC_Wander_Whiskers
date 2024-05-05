import Cart from "../models/Cart.model.js";
import ErrorModel from "../models/Error.model.js";
import Product from "../models/Products.model.js";

const getProductsCart = async (req, res, next) => {
  // Get the products in the cart
  try {
    const productsCart = await Cart.find();
    if (productsCart) return res.status(200).json(productsCart);
  } catch (err) {
    return next(ErrorModel(err));
  }
};

import User from "../models/User.js";
import Cart from "../models/Cart.js";

const addProductCart = async (req, res, next) => {
  // Extraer el ID del usuario autenticado desde la solicitud
  const userId = req.user.id;

  // Extraer los detalles del producto del cuerpo de la solicitud
  const { name, image, quantity, price } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return next(ErrorModel("Usuario no encontrado"));
    }

    // Crear un nuevo documento de carrito con los detalles del producto
    const newProduct = new Cart({
      name,
      image,
      quantity,
      price,
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
    return next(ErrorModel(error));
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
      return next(ErrorModel("Usuario no encontrado"));
    }

    // Buscar el índice del producto en el carrito del usuario
    const productIndex = user.cart.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return next(ErrorModel("Producto no encontrado en el carrito"));
    }

    // Actualizar los detalles del producto en el carrito del usuario
    user.cart[productIndex].set(updatedProduct);

    // Guardar los cambios en el usuario (con el producto actualizado en el carrito)
    await user.save();

    // Responder con el producto actualizado en el carrito
    res
      .status(200)
      .json({
        message: "Producto actualizado en el carrito",
        product: user.cart[productIndex],
      });
  } catch (error) {
    // Manejar errores
    console.error(error);
    return next(ErrorModel(error));
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
      return next(ErrorModel("Usuario no encontrado"));
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
    return next(ErrorModel(error));
  }
};

export {
  getProductsCart,
  addProductCart,
  updateProductCart,
  deleteProductCart,
};

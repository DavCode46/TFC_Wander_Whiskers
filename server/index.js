import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import upload from "express-fileupload";

import userRoutes from "./routes/user.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import cartRoutes from './routes/cart.routes.js'
import productRoutes from './routes/products.routes.js'
import orderRoutes from './routes/orders.routes.js'
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import Product from './models/Product.model.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(upload());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use('/api/users/cart', cartRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  )
  .catch((error) => console.error(error));

//   const servicesData = [
//     {
//       name: "Mensual",
//       description: "Suscripción mensual",
//       price: 20.99,
//       features: [
//         "Posibilidad de publicar anuncios",
//         "Acceso a la base de datos de animales",
//         "Notificaciones",
//         "Soporte prioritario",
//         "Un mes de prueba"
//       ],
//     },
//     {
//       name: "Anual",
//       description: "Suscripción anual",
//       price: 251.88,
//       discountPrice: 200,
//       features: [
//         "Posibilidad de publicar anuncios",
//         "Acceso a la base de datos de animales",
//         "Notificaciones",
//         "Soporte prioritario",
//         "Descuento del 10% en servicios adicionales",
//       ],
//     },
//     {
//       name: "Protectoras",
//       description: "Suscripción especial protectoras",   
//       features: [
//         "Posibilidad de publicar anuncios",
//         "Acceso a la base de datos de animales",
//         "Notificaciones",
//         "Soporte prioritario",
//         "Descuento del 30% en servicios adicionales",
//       ],
//     },
//   ];


// async function insertProducts(products) {
//   try {
//     // Insertar todos los productos en la base de datos de una vez
//     await Product.insertMany(products);
//     console.log('Productos insertados correctamente.');
//   } catch (error) {
//     console.error('Error al insertar productos:', error);
//   } 
// }

// insertProducts(servicesData);

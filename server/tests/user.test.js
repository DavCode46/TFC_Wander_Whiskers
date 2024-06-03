import mongoose from "mongoose";
import request from "supertest";
import { app } from "../index";
import User from "../models/User.model";
import Post from "../models/Post.model";
import Cart from "../models/Cart.model";
import bcrypt from "bcryptjs";
import { jest } from "@jest/globals";
import fs from "fs";
import path, { dirname } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("User Controller", () => {
  // Test para la función register
  const newUser = {
    username: "testuser",
    email: "test1@example.com",
    password: "TestPassword123!",
    confirmPassword: "TestPassword123!",
  };

  it("should return an error if the email is already in use", async () => {
    // Crear un usuario de prueba directamente en la base de datos
    await User.create({
      username: "existinguser",
      email: "test1@example.com",
      password: "ExistingPassword123!",
    });

    const res = await request(app).post("/api/users/register").send(newUser);
    expect(res.statusCode).toEqual(500); // Cambia el código de estado esperado si es necesario
    expect(res.body.message).toBe("El correo electrónico ya está en uso");
  });

  it("should register a new user", async () => {
    // Eliminar cualquier usuario existente con el mismo email para garantizar un estado limpio
    await User.deleteOne({ email: newUser.email });

    const res = await request(app).post("/api/users/register").send(newUser);
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBe("Usuario test1@example.com registrado con éxito");

    // Limpieza: Elimina el usuario creado usando el ID de la respuesta
    await User.deleteOne({ _id: res.body._id });
  });

  //   afterAll(async () => {
  //     // Limpiar todos los usuarios creados durante las pruebas y cerrar la conexión a la base de datos
  //     await User.deleteMany({});
  //     await mongoose.connection.close();
  //   });

  // Test para la función login
  describe("POST /api/users/login", () => {
    it("should login an existing user", async () => {
      await request(app).post("/api/users/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "TestPassword123!",
        confirmPassword: "TestPassword123!",
      });
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "TestPassword123!",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });
  });

  // Test para la función getUser
  describe("GET /api/users/:id", () => {
    it("should get user profile", async () => {
      const user = await User.create({
        username: "testuser",
        email: "test3@test.com",
        password: "TestPassword123!",
        confirmPassword: "TestPassword123!",
      });
      user.save();
      const userId = await User.findOne({ email: user.email });
      console.log("userId", userId);
      const getUserRes = await request(app).get(`/api/users/${userId._id}`);
      console.log("response", getUserRes.body);
      expect(getUserRes.statusCode).toEqual(200);
      expect(getUserRes.body).toHaveProperty("username", "testuser");
      expect(getUserRes.body).toHaveProperty("role", "user");
    });
  });

  // Test para obtener todos los usuarios
  describe("GET /api/users", () => {
    it("should get user profile", async () => {
      const getUsersRes = await request(app).get(`/api/users`);
      expect(getUsersRes.statusCode).toEqual(200);
      expect(getUsersRes.body.length).toBeGreaterThan(0);
    });
  });

  describe("PATCH /api/users/edit", () => {
    let token;
    let userId;

    beforeAll(async () => {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Crear un usuario de prueba
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash("TestPassword123!", salt);

      const user = new User({
        username: "testuser",
        email: "test5@test.com",
        password: hashedPassword,
      });

      await user.save();
      userId = user._id;

      // Iniciar sesión para obtener el token de autenticación
      const res = await request(app).post("/api/users/login").send({
        email: "test5@test.com",
        password: "TestPassword123!",
      });

      token = res.body.token;
    });

    // afterAll(async () => {
    //   await User.deleteMany({});
    //   await mongoose.connection.close();
    // });

    it("should update user info", async () => {
      const res = await request(app)
        .patch(`/api/users/edit`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "updateduser",
          email: "edited@test.com",
          currentPassword: "TestPassword123!",
          newPassword: "NewPassword123!",
          confirmNewPassword: "NewPassword123!",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("username", "updateduser");
      expect(res.body).toHaveProperty("email", "edited@test.com");

      // Verificar que los cambios se hayan guardado en la base de datos
      const updatedUser = await User.findById(userId);
      expect(updatedUser.username).toBe("updateduser");
      expect(updatedUser.email).toBe("edited@test.com");

      // Verificar que la contraseña se haya actualizado correctamente
      const passwordMatch = await bcrypt.compare(
        "NewPassword123!",
        updatedUser.password
      );
      expect(passwordMatch).toBe(true);
    });
  });

  describe("DELETE /api/users/:id", () => {
    let userToDelete;
    let authToken;

    beforeAll(async () => {
      //   // Conectar a la base de datos de pruebas
      //   await mongoose.connect(process.env.MONGO_TESTS_URI, {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //   });

      const newUser = {
        username: "testuser",
        email: "test@example.com",
        password: "TestPassword123!",
        confirmPassword: "TestPassword123!",
        role: "admin",
      };
      // Crear un usuario de prueba
      await request(app).post("/api/users/register").send({
        newUser,
      });
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "TestPassword123!",
      });

      userToDelete = await User.findOne({ email: newUser.email });
      console.log("login res", res.body);
      authToken = res.body.token;
    });

    afterAll(async () => {
      // Limpiar la base de datos después de las pruebas
      await User.deleteMany({});
      await mongoose.connection.close();
    });

    it("should delete a user and associated posts", async () => {
      


      // Crear un post asociado al usuario a eliminar
      // La imagen ya ha sido borrada, no existe así que la siguiente vez dará error
      const post = new Post({
        title: "Test Post",
        content: "This is a test post",
        author: userToDelete._id,
        image: 'bulldoge095c7a6-dd42-43f6-82a3-a68c46a542c9.jpg',
        condition: "Perdido",
        location: "test location",
        specie: "Gato",
      });
      await post.save();

      // Crear un carrito asociado al usuario a eliminar
      const cart = new Cart({
        user: userToDelete._id,
        items: [],
      });
      await cart.save();

      // Realizar la solicitud para eliminar el usuario
      const res = await request(app)
        .delete(`/api/users/${userToDelete._id}`)
        .set("Authorization", `Bearer ${authToken}`);
      console.log("delete body", res.body);
      // Verificar que la solicitud fue exitosa
      expect(res.statusCode).toEqual(200);
      expect(res.body.msg).toEqual("Usuario eliminado");

      // Verificar que el usuario fue eliminado de la base de datos
      const deletedUser = await User.findById(userToDelete._id);
      expect(deletedUser).toBeNull();

      // Verificar que los posts asociados al usuario fueron eliminados
      const posts = await Post.find({ author: userToDelete._id });
      expect(posts.length).toEqual(0);

      // Verificar que el carrito asociado al usuario fue eliminado
      const deletedCart = await Cart.findOne({ user: userToDelete._id });
      expect(deletedCart).toBeNull();
    });
  });
});

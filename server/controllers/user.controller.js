import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import ErrorModel from "../models/Error.model.js";
import User from "../models/User.model.js";
import Post from "../models/Post.model.js";

/* 
    REGISTER A USER
    post --> api/users/register

    UNPROTECTED ROUTE
*/

const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password)
      return next(new ErrorModel("Por favor, rellene todos los campos", 400));

    const lowerEmail = email.toLowerCase();

    const emailInUse = await User.findOne({ email: lowerEmail });

    if (emailInUse)
      return next(new ErrorModel("El correo electrónico ya está en uso", 400));

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password.trim()))
      return next(
        new ErrorModel(
          `<ul>
                <li>Al menos 8 caracteres de longitud</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos una letra minúscula</li>
                <li>Al menos un caracter especial</li>
          </ul>`,
          400
        )
      );
    if (password !== confirmPassword)
      return next(new ErrorModel("Las contraseñas no coinciden", 400));

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await User.findOne({ role: "admin" });

    if (!admin && email == process.env.ADMIN_EMAIL) {
      const user = new User({
        username,
        email: lowerEmail,
        password: hashedPassword,
        role: "admin",
      });
      await user.save();
      res.status(201).json(`Usuario ${user.email} registrado con éxito`);
    } else {
      const user = new User({
        username,
        email: lowerEmail,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json(`Usuario ${user.email} registrado con éxito`);
    }
  } catch (err) {
    return next(new ErrorModel("Registro fallido", 422));
  }
};

/* 
    LOGIN A USER
    post --> api/users/login

    UNPROTECTED ROUTE
*/

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorModel("Por favor, rellene todos los campos", 400));

    const lowerEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerEmail });
    if (!user) return next(new ErrorModel("Credenciales incorrectas", 400));

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return next(new ErrorModel("Credenciales inválidas", 400));

    const { _id: id, username } = user;

    const token = jwt.sign({ id, username }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, id, username, role: user.role });
  } catch (err) {
    return next(new ErrorModel("Inicio de sesión fallido", 422));
  }
};

/* 
    ROUTE FOR THE USER PROFILE
    get --> api/users/:id

    PROTECTED ROUTE
*/

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) return next(new ErrorModel("Usuario no encontrado", 404));

    res.status(200).json(user);
  } catch (err) {
    return next(new ErrorModel("Error al obtener el perfil del usuario", 422));
  }
};

/* 
    GET USERS
    GET: api/users/creators
    UNPROTECTED ROUTE    
*/

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users) return next(new ErrorModel("No se encontraron usuarios", 404));

    res.status(200).json(users);
  } catch (err) {
    return next(new ErrorModel("Error al obtener los usuarios", 422));
  }
};

/* 
    CHANGE USER PROFILE IMAGE
    POST: api/users/change-image
    PROTECTED ROUTE
*/

const changeImage = async (req, res, next) => {
  try {
    if (!req.files.profileImage) {
      return next(new ErrorModel("Por favor selecciona una imagen", 422));
    }

    const user = await User.findById(req.user.id);

    if (user.profileImage) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", user.profileImage),
        (err) => {
          if (err) {
            return next(new ErrorModel(err));
          }
        }
      );
    }

    const { profileImage } = req.files;

    if (profileImage.size > 2000000) {
      return next(
        new ErrorModel("La imagen de perfil no puede superar los 2Mb")
      );
    }

    let fileName;
    fileName = profileImage.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    profileImage.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new ErrorModel(err));
        }

        const updatedprofileImage = await User.findByIdAndUpdate(
          req.user.id,
          { profileImage: newFilename },
          { new: true }
        );

        if (!updatedprofileImage) {
          return next(
            new ErrorModel("Error al cambiar la imagen de perfil", 422)
          );
        }
        res.status(200).json(updatedprofileImage);
      }
    );
  } catch (error) {
    return next(new ErrorModel(error));
  }
};

/* 
    EDIT USER PROFILE
    POST: api/users/edit
    PROTECTED ROUTE
*/

const editUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;

    if (!username || !email || !currentPassword || !newPassword)
      return next(new ErrorModel("Por favor, rellene todos los campos", 400));

    const user = await User.findById(req.user.id);
    if (!user) return next(new ErrorModel("Usuario no encontrado", 404));

    const emailInUse = await User.findOne({ email });
    if (emailInUse && emailInUse._id != user.id)
      return next(new ErrorModel("El correo electrónico ya está en uso", 400));

    const validatePassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validatePassword)
      return next(new ErrorModel("Contraseña incorrecta", 400));

    if (newPassword !== confirmNewPassword)
      return next(new ErrorModel("Las contraseñas no coinciden", 400));

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const newUserInformation = await User.findByIdAndUpdate(
      req.user.id,
      {
        username,
        email,
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(200).json(newUserInformation);
  } catch (err) {
    return next(new ErrorModel("Error al editar el perfil del usuario", 422));
  }
};

/* 
    Delete a user
    delete: api/users/:id
    PROTECTED ROUTE
*/

const deleteUser = async (req, res, next) => {
  try {
    console.log("req.user.id", req.user.id);
    const userId = req.params.id;
    const posts = await Post.find({ author: userId });
    posts.forEach(async (post) => {
      if (post.image) {
        const imagePath = path.join(__dirname, "..", "uploads", post.image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            return next(new ErrorModel(err));
          }
        });
      }
    });
    await Post.deleteMany({ author: userId });
    const userToDelete = await User.findById(userId);
    console.log("usertodelete", userToDelete);
    const user = await User.findById(req.user.id);
    if (!userToDelete) {
      return next(new ErrorModel("Usuario no encontrado", 404));
    }
    console.log(req.user.id, userToDelete.id, user.role, req.user.username);

    // Verificar permisos: el usuario actual debe ser el propietario del usuario a eliminar o un administrador
    if (req.user.id !== userToDelete.id && req.user.username !== "admin") {
      return next(
        new ErrorModel("No tienes permisos para eliminar este usuario", 403)
      );
    }

    // Eliminar la imagen de perfil asociada si existe
    if (userToDelete.profileImage) {
      const profileImageName = userToDelete.profileImage;
      fs.unlink(
        path.join(__dirname, "..", "uploads", profileImageName),
        async (err) => {
          if (err) {
            return next(new ErrorModel(err));
          } else {
            try {
              // Eliminar el usuario de la base de datos
              await User.findByIdAndDelete(req.params.id);
              res.status(200).json({ msg: "Usuario eliminado" });
            } catch (error) {
              return next(new ErrorModel(error));
            }
          }
        }
      );
    } else {
      // Si el usuario no tiene imagen de perfil, solo elimina el usuario de la base de datos
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Usuario eliminado" });
    }
  } catch (err) {
    next(new ErrorModel(err));
  }
};

export {
  register,
  login,
  getUser,
  getUsers,
  changeImage,
  editUser,
  deleteUser,
};
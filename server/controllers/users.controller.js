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


/* 
    ROUTE FOR THE USER PROFILE
    get --> api/users/:id

    PROTECTED ROUTE
*/



/* 
    GET USERS
    GET: api/users/creators
    UNPROTECTED ROUTE    
*/


/* 
    CHANGE USER PROFILE IMAGE
    POST: api/users/change-image
    PROTECTED ROUTE
*/



/* 
    EDIT USER PROFILE
    POST: api/users/edit
    PROTECTED ROUTE
*/



/* 
    Delete a user
    delete: api/users/:id
    PROTECTED ROUTE
*/
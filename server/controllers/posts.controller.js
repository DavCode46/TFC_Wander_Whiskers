import Post from "../models/Post.model.js";
import User from "../models/User.model.js";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import ErrorModel from "../models/Error.model.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* 
    CREATE A POST
    Post: api/posts
    PROTECTED ROUTE
*/
const createPost = async (req, res, next) => {
    try {
      let { title, content, specie, location, condition } = req.body;
      if (!title || !content || !specie || !location || !condition || !req.files) {
        return next(
          new ErrorModel("Todos los campos son obligatorios", 422)
        );
      }
      const { image } = req.files;
      /* Check the file size */
      if (image.size > 2000000) {
        return next(new ErrorModel("La imagen debe tener un máximo de 2MB", 422));
      }
      let fileName = image.name;
      let splittedFilename = fileName.split(".");
      let newFilename =
        splittedFilename[0] +
        uuid() +
        "." +
        splittedFilename[splittedFilename.length - 1];
      image.mv(
        path.join(__dirname, "..", "/uploads", newFilename),
        async (err) => {
          if (err) {
            return next(new ErrorModel(err));
          } else {
            const newPost = await Post.create({
              title,
              content,
              specie,
              location,  
              condition,        
              image: newFilename,
              author: req.user.id,
            });
            if (!newPost) {
              return next(new ErrorModel("Error al crear la publicación", 422));
            }
            res.status(201).json(newPost);
          }
        }
      );
    } catch (error) {
      return next(new ErrorModel(error));
    }
  };


/* 
    Get all posts
    get: api/posts
    UNPROTECTED ROUTE
*/


/* 
    Get a post
    get: api/posts/:id
    UNPROTECTED ROUTE
*/


/* 
    Get posts by location
    get: api/posts/location/:location
    unprotected route
*/


/* 
    Get posts by pet type
    get: api/posts/specie/:specie
    unprotected route
*/


/* 
    Get posts by condition
    get: api/posts/condition/:condition
    unprotected route
*/


/* 
    Get posts by author
    get: api/posts/users/:id
    unprotected route
*/



/* 
    Update a post
    put: api/posts/:id
    PROTECTED ROUTE
*/



/* 
    Delete a post
    delete: api/posts/:id
    PROTECTED ROUTE
*/
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

const getAllPosts = async (req, res, next) => {
    try {
      const posts = await Post.find().sort({ updatedAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      next(new ErrorModel(err));
    }
  };
/* 
    Get a post
    get: api/posts/:id
    UNPROTECTED ROUTE
*/
const getPost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) return next(new ErrorModel("Post no encontrado", 404));
      res.status(200).json(post);
    } catch (err) {
      next(new ErrorModel(err));
    }
  };
  

/* 
    Get posts by location
    get: api/posts/location/:location
    unprotected route
*/
const getPostsByLocation = async (req, res, next) => {
    try {
      const { location } = req.params;
      const locationPosts = await Post.find({ location }).sort({ updatedAt: -1 });
      if (!locationPosts)
        return next(
          new ErrorModel("No se han encontrado posts en esta localización", 404)
        );
      res.status(200).json(locationPosts);
    } catch (err) {
      next(new ErrorModel(err));
    }
  };

/* 
    Get posts by specie
    get: api/posts/specie/:specie
    unprotected route
*/

const getPostsBySpecie = async (req, res, next) => {
    try {
      const { specie } = req.params;
      console.log(specie)
      const petPosts = await Post.find({ specie }).sort({ updatedAt: -1 });
      if (!petPosts)
        return next(
          new ErrorModel(
            "No se han encontrado posts de este tipo de mascota",
            404
          )
        );
      res.status(200).json(petPosts);
    } catch (err) {
      next(new ErrorModel(err));
    }
  };
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
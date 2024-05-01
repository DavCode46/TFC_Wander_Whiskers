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
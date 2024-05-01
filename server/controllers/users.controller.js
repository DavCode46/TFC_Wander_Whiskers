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
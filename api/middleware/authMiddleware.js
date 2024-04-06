import jwt from 'jsonwebtoken';
import createError from "../helpers/createError.js";

import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET;

export default async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // split Bearer
    
    if(!token) {
        return next(createError(401, 'No token provided'));
    }
    
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;// Store user data in request object
        console.log(req.userId);

        next();
    } catch (err) {
        // If the token is not valid, send a 401 Unauthorized error
        next(createError(
            401, 
            "Invalid token!"
        ));
    };
}

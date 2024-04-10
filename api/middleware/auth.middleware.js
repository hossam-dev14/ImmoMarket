import jwt from 'jsonwebtoken';
import createError from "../helpers/createError.js";

import dotenv from 'dotenv';
dotenv.config();

const access_secret = process.env.ACCESS_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

// Check if user is authenticated or not
export function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // split Bearer
  if(!token) return next(createError(401, 'No token provided'));
  
  try {
    const decoded = jwt.verify(token, access_secret);
    // Store user data in request object
    req.user = decoded.userId;
    // console.log('User ID: ',req.user);
    next();
  } catch (err) {
    // If the token is not valid, send a 401 Unauthorized error
    next(createError(401, "Invalid token!"));
  };
}


export function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  try {
  jwt.verify(token, access_secret, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = { userId: decoded.userId };
      next();
    });} catch (err) {
      // If the token is not valid, send a 401 Unauthorized error
    next(createError(401, "Invalid token!"));
  };
}

// Middleware to verify the refresh token
export const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refresh_token; // Retrieve the refresh token from the cookie
    try {
      const decoded = jwt.verify(refreshToken, refresh_secret);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid refresh token' });
    }
};



// Handling users roles
// export const authorizeRoles = (...roles) => {
//   if (!roles.includes(req.user.role)) {
//     return  next(createError(403, `Unauthorized - You are not authorized to view this resource.`));
//   }
//   next();
// }
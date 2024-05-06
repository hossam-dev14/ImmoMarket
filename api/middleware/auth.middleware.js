import jwt from 'jsonwebtoken';
import createError from "../helpers/createError.js";

import dotenv from 'dotenv';
dotenv.config();

const access_secret = process.env.ACCESS_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

// Check if user is authenticated or not
export function isAuthenticated(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return next(createError(401, 'No token provided'));
  }

  const token = authorizationHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, access_secret);
    req.user = decoded.userId;
    next();
  } catch (err) {
    next(createError(401, 'Invalid token'));
  }
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


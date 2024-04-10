import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  deleteUser, 
  updateUser,
  getUsers,
  getUserDetails,
} from '../controllers/user.controler.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/', isAuthenticated, getUsers);

router.
  route('/profile').
  get(isAuthenticated, getUserDetails).
  put(isAuthenticated, updateUser);

router.delete('/:id', deleteUser);
// router.post('/dashboard', verifyToken, dashdoard)

export default router;

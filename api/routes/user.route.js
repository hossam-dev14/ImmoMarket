import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  deleteUser, 
  updateUser,
  getUsers,
  getUser,
} from '../controllers/user.controler.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', authMiddleware, getUsers);

// router.get(('/profile'), authMiddleware, getUser);
router.
  route('/profile').
  get(authMiddleware, getUser). 
  put(authMiddleware, updateUser);

router.delete('/:id', deleteUser);
// router.post('/dashboard', verifyToken, dashdoard)

export default router;

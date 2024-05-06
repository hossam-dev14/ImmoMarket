import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  signUp,
  signIn,
  signOut, 
  getAccessToken
} from '../controllers/auth.controller.js';
import { 
  verifyRefreshToken, 
  isAuthenticated 
} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUp); 
router.post('/signin', signIn);
router.post('/refresh-token', verifyRefreshToken, getAccessToken);
router.post('/signout', signOut);

export default router;

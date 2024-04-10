import express from 'express';
import { 
  addProperty, 
  getProperty, 
  getAllProperties,
  updateProperty, 
  deleteProperty
} from '../controllers/property.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// Property route 
router.post('/add', isAuthenticated, addProperty);
router.get('/:id', getProperty);
router.get('/', getAllProperties);
router.put('/:id', isAuthenticated, updateProperty);
router.delete('/:id', isAuthenticated, deleteProperty);

export default router;

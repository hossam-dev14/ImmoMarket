// routes/propertyRoutes.js
import express from 'express';
import { 
  addProperty
 } from '../controllers/property.controller.js';

const router = express.Router();

router.post('/add', addProperty);

export default router;

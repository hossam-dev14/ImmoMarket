import express from "express";
import {
  addProperty,
  getProperty,
  getAllProperties,
  getPopularProperties,
  getLatestProperties,
  getMyListing,
  searchProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
// import uploadOptions from '../middleware/multer.middleware.js';
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Uploding files
const uploadImage = upload.single("imageUrl");

// Tetst search
router.get("/get", searchProperties);

// Property route
router.post("/add", isAuthenticated, uploadImage, addProperty);
router.get("/", isAuthenticated, getMyListing);
router.get("/all", getAllProperties);
router.get("/latest", getLatestProperties);
router.get("/popular", getPopularProperties);
router.get("/:id", getProperty);
router.put("/update/:id", isAuthenticated, uploadImage, updateProperty);
router.delete("/delete/:id", isAuthenticated, deleteProperty);

export default router;

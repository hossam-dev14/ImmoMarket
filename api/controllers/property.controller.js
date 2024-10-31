import { v2 as cloudinary } from "cloudinary";
import Property from "../models/property.model.js";
import createError from "../helpers/createError.js";

// Add property
export const addProperty = async (req, res, next) => {
  const {
    title,
    description,
    address,
    price,
    listingType,
    category,
    bedrooms,
    bathrooms,
    furnished,
    parking,
  } = req.body;

  try {
    // // Ensure that all required fields are provided
    if (
      !title ||
      !description ||
      !address ||
      !price ||
      !listingType ||
      !category ||
      !bedrooms ||
      !bathrooms
    ) {
      return next(createError(400, "Please provide all required fields."));
    }

    // Get the uploaded file
    const file = req.file;
    if (!file) return next(createError(400, "No image in the request"));

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    // Ensure that ownerId is present in the request (assuming it's populated by middleware)
    const ownerId = req.user;
    if (!ownerId) {
      return next(createError(404, "Owner not found"));
    }

    // Create a new property
    const newProperty = await Property.create({
      title,
      description,
      address,
      price,
      listingType,
      category,
      furnished,
      parking,
      bedrooms,
      bathrooms,
      imageUrl: result.secure_url,
      ownerId,
    });

    res.status(201).json({
      message: "Property added successfully",
      newProperty,
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// Retrieve a single property using its ID.
export const getProperty = async (req, res, next) => {
  const propID = req.params.id;

  try {
    const property = await Property.findByIdAndUpdate(
      propID,
      { $inc: { views: 1 } }, // Increment the views field by 1
      { new: true } // Return the updated document
    ).populate("ownerId", "-password -refreshToken");
    if (!property) {
      return next(createError(404, "No property found"));
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

// Retrieve all properties with filters by (price, listingType, coterogy,)
export const getAllProperties = async (req, res, next) => {
  // We look for a query parameter "search, price ..."
  let { search, price, listingType, category } = req.query;
  let query = {};

  if (search === undefined) {
  }

  // Filter properties by type
  if (listingType === undefined || listingType === "all") {
    query.listingType = listingType;
    listingType = { $in: ["apartments", "houses", "offices"] };
  }

  // Filter properties by category
  if (category || category === undefined) {
    query.category = category;
  }
  if (category === undefined || category) {
    query.category = category;
    category = { $in: ["sale", "rent"] };
  }

  try {
    const properties = await Property.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        // Search by property description (case-insensitive)
      ],
      listingType,
      category,
    })
      .sort({ createdAt: "desc" })
      .populate("ownerId", "-password -refreshToken");
    // sort from the latest to the earliest
    // populates the ownerId field to include the user details associated with each property.

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// Get latest properties
export const getLatestProperties = async (req, res, next) => {
  try {
    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("ownerId", "-password -refreshToken");

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// Get popular properties
export const getPopularProperties = async (req, res, next) => {
  try {
    const properties = await Property.find()
      .sort({ views: -1 })
      .limit(10)
      .populate("ownerId", "-password -refreshToken");

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// Retrieve properties based on search query
export const searchProperties = async (req, res, next) => {
  try {
    const { search } = req.query;
    const properties = await Property.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        // Search by property description (case-insensitive)
      ],
    }).populate("ownerId", "-password -refreshToken");

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// Retrive my properties list
export const getMyListing = async (req, res, next) => {
  try {
    const ownerID = req.user;
    // Check if ownerID is a valid ObjectId
    if (!ownerID) return next(createError(400, "Invalid user ID format"));

    const properties = await Property.find({ ownerId: ownerID });

    // Check if properties array is empty
    if (properties.length === 0)
      return next(createError(404, "No properties found for this user"));

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// Update property by ID
export const updateProperty = async (req, res, next) => {
  const { id } = req.params;

  const {
    title,
    description,
    address,
    price,
    listingType,
    category,
    bedrooms,
    bathrooms,
    furnished,
    parking,
    imageUrl,
  } = req.body;

  try {
    // Find the property by id
    let property = await Property.findById(id);

    //  Check if the property exists
    if (!property) {
      return next(createError(404, "Property not found"));
    }

    // Ensure that the user owns the property
    const ownerId = req.user;
    if (!ownerId) {
      return next(createError(404, "Owner not found"));
    }

    if (property.ownerId.toString() !== ownerId) {
      return next(
        createError(403, "You are not authorized to edit this property")
      );
    }

    // Get the uploaded file if it exists
    const file = req.file;
    // if (!file) return next(createError(400, 'No image in the request'));
    let newImageUrl;

    // Check if a file was uploaded
    if (file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      newImageUrl = result.secure_url;
    }

    // Update the property
    property = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        address,
        price,
        listingType,
        category,
        furnished,
        parking,
        bedrooms,
        bathrooms,
        imageUrl: newImageUrl,
      },
      { new: true }
    );

    if (!property) {
      throw createError(404, "No property found");
    }

    res.status(200).json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    next(error);
  }
};

// Delete property by ID
export const deleteProperty = async (req, res, next) => {
  try {
    // Find the property by ID
    const property = await Property.findById(req.params.id);

    // Check if the property exists
    if (!property) {
      return res.status(404).json({ error: "Property not found!" });
    }

    // console.log(req.user !== property.ownerId.toString());

    // Check if the user is authorized to delete the property
    if (req.user !== property.ownerId.toString()) {
      return res
        .status(401)
        .json({ error: "You can only delete your own properties!" });
    }

    // Delete the property
    await Property.findByIdAndDelete(req.params.id);

    // Respond with success message
    res.status(200).json({ message: "Property has been deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};

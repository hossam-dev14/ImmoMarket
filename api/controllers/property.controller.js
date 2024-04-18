import Property from '../models/property.model.js';
import createError from '../helpers/createError.js';

// Add property
export const addProperty = async (req, res, next) => {
  const { title, description, address, price, listingType, 
    category, bedrooms, bathrooms, furnished, parking
  } = req.body;

  try {
    // // Ensure that all required fields are provided
    if (!title || !description || !address || !price || !listingType || !category || !bedrooms || !bathrooms) {
      return next(createError(400, "Please provide all required fields."));
    }
    
    const file = req.file;
    if (!file) return next(createError(400, 'No image in the request'));
    
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/images/`;

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
      imageUrl: `${basePath}${fileName}`,
      ownerId
    });
  
    res.status(201).json({ 
      message: 'Property added successfully', 
      newProperty 
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// Retrieve a single property using its ID.
export const getProperty = async (req, res, next) => {
  const propID = req.params.id;

  try{
    const property = await Property.findById(propID).populate('ownerId', '-password -refreshToken');
    if (!property) {
      return next(createError(404, 'No property found'));
    } 
    res.status(200).json(property);
  } catch(error){
    next(error);
  }
};

// Retrieve all properties
export const getAllProperties = async (req, res, next) => {
  try { 
    const properties = await Property.find().populate('ownerId', '-password');
    //populates the ownerId field to include the user details associated with each property.
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Retrive my properties list
export const getMyListing = async (req, res, next) => {
  try {
    const ownerID = req.user;
    // Check if ownerID is a valid ObjectId
    if (!ownerID) return next(createError(400, 'Invalid user ID format'));

    const properties = await Property.find({ownerId: ownerID});

    // Check if properties array is empty
    if (properties.length === 0) return next(createError(404, 'No properties found for this user'));

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update property by ID
export const updateProperty = async (req, res, next) => {
  const propID = req.params.id;
  // console.log(req.user);
  try {
  //   // Find the property by ID
    const property = await Property.findById(propID);
    console.log(property);
    
    // Check if the property exists
    if (!property) {
      return res.status(404).json({ error: 'Property not found!' });
    }

    console.log(property.ownerId.toString());
    
    // Check if the user is authorized to update the property
    if (req.user !== property.ownerId.toString()) {
      return res.status(401).json({ error: 'You can only update your own properties!' });
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(
      propID, 
      req.body, 
      { new: true }
    );
    if (!updatedProperty) {
      throw createError(404, 'No property found');
    }
    res.status(200).json({
      message: 'Property updated successfully',
      updatedProperty
    });
  } catch (error) {
    console.error(error);
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
      return res.status(404).json({ error: 'Property not found!' });
    }

    console.log(req.user !== property.ownerId.toString());

    // Check if the user is authorized to delete the property
    if (req.user !== property.ownerId.toString()) {
      return res.status(401).json({ error: 'You can only delete your own properties!' });
    }

    // Delete the property
    await Property.findByIdAndDelete(req.params.id);

    // Respond with success message
    res.status(200).json({ message: 'Property has been deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
};

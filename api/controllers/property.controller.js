import Property from '../models/property.model.js';
import createError from '../helpers/createError.js';

// Add property
export const addProperty = async (req, res, next) => {
  const { 
    title, 
    description, 
    address, 
    price, 
    listingType, 
    category, 
    area, 
    parking, 
    imageUrls, 
    bedrooms, 
    bathrooms
  } = req.body;

  const ownerId = req.user;
  try {
    // Create a new property
    const newProperty = await Property.create({
      title,
      description,
      address,
      price,
      listingType,
      category,
      area,
      parking,
      imageUrls,
      bedrooms,
      bathrooms,
      ownerId // Add ownerId to the property object
    });

    // const newProperty = await Property.create({ ...req.body, ownerId: req.user._id });
    res.status(201).json({ 
      message: 'Property added successfully', 
      newProperty 
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to add property' 
    });
    console.log(error);
    // next(error);
  }
};

// Retrieve a single property using its ID.
export const getProperty = async (req, res) => {
  const propID = req.params.id;
  try{
    const property = await Property.findById(propID).populate('ownerId');
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
    const properties = await Property.find().populate('ownerId');
    //populates the userRef field to include the user details associated with each property.
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
    
    // Check if the property exists
    if (!property) {
      return res.status(404).json({ error: 'Property not found!' });
    }
    
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










// tabnine --------------------//

// Create and save a new property to the database wiht images url.
// const addProperty = async ("/api/property", upload.single('image'), async (req, res) => {
//   let imagePath;
//   if(!req.file){
//     return res.send("No file uploaded!");
//   }else{
//     imagePath= req.file.path;
//   }
//   const newProperty = new Property ({
//     title : req.body.title,
//     description : req.body.description,
//     location : req.body.location,
//     price : req.body.price,
//     bedrooms : req.body.bedrooms,
//     bathrooms : req.body.bathrooms,
//     image : imagePath
//   })
//   try {
//     const savedProperty = await newProperty.save();
//     res.status(201).json(savedProperty);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "Invalid Entry"});
//   }
// });

// // Update an existing property by ID
// app.put('/api/property/:id',auth ,upload.single('image'),async (req,res)=> {
//   const propID = req.params.id;
//   // Check user owns this property
//   const property = await Property.findById(propID).exec();
//   if (property.user != req.userId) {
//     return res.status(401).json({message:"You don't have permission to edit this property."})
//   }
  
//   // If there is a file in the request then save it to /images folder
//   if (req.file) {
//       fs.unlinkSync(`images/${property.image}`);
//       req.body.image = `images/${req.file.filename}`;
//   } else if (!req.body.isListed){
//       // Remove image if not listed anymore
//       fs.unlinkSync(`images/${property.image}`)
//       req.body.image=null;
//   }

//   // Field validation
//   const {error} = validateProperty(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // Save updated info into the DB
//   const updateProp = await Property.findByIdAndUpdate(propID,req.body,{new:true}).exec();
//   res.status(200).json(updateProp);
// });

// Delete a property
// export const deleteProperty = async (req,res)=> {
//   const propID = req.params.id;
//   // Find and delete the property
//   const deletedProp = await Property.findByIdAndDelete(propID).exec();
//   // Also remove its image from the server
//   fs.unlinkSync(`images/${deletedProp.image}`);
//   res.status(204).json("Deletion Successful");
// };

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

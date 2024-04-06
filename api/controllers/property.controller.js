import Property from '../models/property.model.js';
import createError from '../helpers/createError.js';

const addProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ message: 'Property added successfully', property });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add property' });
  }
};
export { addProperty };


// tabnine --------------------//

// // Create and save a new property to the database.
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

// // Retrieve all properties from the database.
// app.get('/api/properties', async (req,res)=>{
//   const properties = await Property.find()
//                             .sort([['createdAt','descending']])
//                             .lean().exec();
//   res.status(200).json(properties);
// });

// // Retrieve a single property using its ID.
// app.get('/api/property/:id',async (req,res)=> {
//   const propID = req.params.id;
//   const property = await Property.findById(propID).populate('user').lean().exec();
//   if (!property) return res.status(404).json({message:'No property found'})
//   res.status(200).json(property);
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

// // Delete a property from the database.
// app.delete('/api/property/:id', auth , async (req,res)=>{
//   const propID = req.params.id;
//   // Find and delete the property
//   const deletedProp = await Property.findByIdAndDelete(propID).exec();
//   // Also remove its image from the server
//   fs.unlinkSync(`images/${deletedProp.image}`);
//   res.status(204).json("Deletion Successful");
// });

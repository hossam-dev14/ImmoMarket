import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  price: {type: Number, required: true},
  type: { // property type, e.g., "house", "apartment" etc.
    type: String, enum: ['House', 'Apartment']
  },
  type: { type: String , enum: ['rent', 'sell']} , // for rent or sell
  area: {type: Number},
  rooms: {
    bedrooms: { type: Number },
    bathrooms: { type: Number },
  },
  // rooms: {type: Object, of: 'number'}, // number of bedrooms, bathrooms etc.
  parking: {type: Boolean, required: true},
  imageUrls: {type: Array,required: true,},
  // agentId:{type: 'ObjectID', ref: 'Agent'} , // should be a reference to Agent model
  userRef: {type: String, required: true}, // should be a reference to User model (basic ex)
  
}, {timestamps: true });



export default mongoose.model('Property', PropertySchema);


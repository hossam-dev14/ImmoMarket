import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  price: {type: Number, required: true},
  listingType: {type: String , enum: ['apartments', 'houses', 'offices']},
  category: {type: String , enum: ['rent', 'sell']}, // for rent or sell
  area: {type: Number},
  parking: {type: Boolean, required: true},
  imageUrls: {type: Array, required: true},
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  ownerId: { type: String, required: true },
  // ownerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true });

export default mongoose.model('Property', PropertySchema);


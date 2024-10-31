import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    listingType: { type: String, enum: ["apartments", "houses", "offices"] },
    category: { type: String, enum: ["rent", "sale"] },
    furnished: { type: Boolean, required: true },
    parking: { type: Boolean, required: true },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    imageUrl: { type: String, required: false },
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    views: { type: Number, default: 0 }, // New field to track the number of views
  },
  { timestamps: true }
);

// Adding virtual id for fronend frienly
PropertySchema.virtual('id').get(function() {
  return this._id.toHexString();
})
PropertySchema.set('toJSON', { virtuals: true });


export default mongoose.model('Property', PropertySchema);

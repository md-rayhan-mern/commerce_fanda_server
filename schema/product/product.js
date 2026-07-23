import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  oldPrice: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  review: {
    type: Number,
    default: 0
  },
  breadcrumbs: {
    type: [String],
    required: true
  },
  galleryImage: {
    type: [String],
    default: []
  },
  brand: {
    type: [String],
    required: true
  }
}, {
  timestamps: true 
});

 export default mongoose.model('Product', productSchema);

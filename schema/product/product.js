<<<<<<< HEAD
=======

>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    review: {
      type: Number,
      default: 0,
    },
    breadcrumbs: {
      type: [String],
      required: true,
    },
    galleryImage: {
      type: [String],
      default: [],
    },
    brand: {
      type: [String],
      required: true,
    },
    stock: {
      quantity: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"],
        default: 0,
      },
      status: {
        type: String,
        enum: ["IN_STOCK", "OUT_TO_STOCK", "LOW_STOCK"],
        default: "IN_STOCK",
      },
    },

    offer: {
      discountPercent: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      startDate: {
        type: Date,
        default: null,
      },
      endDate: {
        type: Date,
        default: null,
      },
    },
    faqs: [{ type: mongoose.Schema.Types.ObjectId, ref: "FAQ" }],
  },

  {
    timestamps: true,
  },
);
// কোয়েরি ফাস্ট করার জন্য ইনডেক্সিং
productSchema.index({ "offer.endDate": 1 });

<<<<<<< HEAD
export default mongoose.model("Product", productSchema);
=======
export default mongoose.model("Product", productSchema);
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    question: {
      type: String,
      required: [true, "Question is metter"],
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("FAQ", faqSchema);

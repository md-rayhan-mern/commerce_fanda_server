import mongoose from "mongoose";

<<<<<<< HEAD
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
=======
const faqSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    Q: {
        type: String,
        required: true,
        trim: true,
        
    },
    A: {
        type: String,
        trim: true,
        default: "",
    },
    isAnswered: {
        type: Boolean,
        default: false // এর মাধ্যমে সহজে ফিল্টার করতে পারবেন কোন প্রশ্নগুলোর উত্তর এখনো দেওয়া হয়নি
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true
    }
}, {timestamps: true});

export default mongoose.model("FAQ", faqSchema );
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

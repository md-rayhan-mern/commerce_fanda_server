import mongoose from "mongoose";

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
    }
}, {timestamps: true});

export default mongoose.model("FAQ", faqSchema );
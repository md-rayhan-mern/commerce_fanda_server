import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // ১. প্রাথমিক তথ্য (রেজিস্ট্রেশনের সময় লাগবে)
  name: {
    type: String,
    required: [true, "নাম দেওয়া বাধ্যতামূলক"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "মোবাইল নম্বর দেওয়া বাধ্যতামূলক"],
    unique: true, // একই ফোন নাম্বার দিয়ে দুটি অ্যাকাউন্ট খোলা যাবে না
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // এর ফলে ইমেইল ছাড়া অ্যাকাউন্ট খুললেও ডাটাবেজ ইউনিক ইরর দেবে না
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "পাসওয়ার্ড দেওয়া अनिवार्य"],
    minlength: [6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে"],
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other", "Not Specified"],
      message: "জেন্ডার অবশ্যই Male, Female অথবা Other হতে হবে",
    },
    default: "Not Specified", // শুরুতে ফাঁকা থাকলে এটি সেট হবে
  },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },

  // ২. প্রোফাইল সেকশন (ইউজার পরে এডিট করে এগুলো পূরণ করবে)
  profilePicture: {
    type: String,
    default: "https://placeholder.com", // ডিফল্ট ছবি
  },
  birthDate: {
    type: Date,
  },

  // কাস্টমারের ডেলিভারি ঠিকানা (একটি ইউজারের একাধিক ঠিকানা থাকতে পারে, যেমন: বাসা বা অফিস)
  addresses: [
    {
      addressType: {
        type: String,
        enum: ["Home", "Office", "Other"],
        default: "Home",
      },
      receiverName: { type: String, trim: true }, // পণ্যটি কে রিসিভ করবে
      receiverPhone: { type: String, trim: true },
      division: { type: String, required: true }, // বিভাগ
      district: { type: String, required: true }, // জেলা
      thana: { type: String, required: true }, // থানা বা উপজেলা
      areaDetails: { type: String, required: true }, // গ্রাম/রোড/ফ্ল্যাট নম্বর
      postCode: { type: String, trim: true }, // পোস্টাল কোড
    },
  ],

  // ৩. সিস্টেম ও সিকিউরিটি ফিল্ড (ব্যাকএন্ড ট্র্যাকিংয়ের জন্য)
  isVerified: {
    type: Boolean,
    default: false, // ওটিপি বা ইমেইল ভেরিফাই হলে true হবে
  },
  isActive: {
    type: Boolean,
    default: true, // কোনো ইউজারকে ব্লক করতে চাইলে এটি false করে দেওয়া যাবে
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// প্রতিবার ডাটা আপডেট হলে স্বয়ংক্রিয়ভাবে updatedAt সময় পরিবর্তন করার জন্য
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);

import ProductSchema from "../../../schema/product/product.js";

export const getProductService = async (query) => {
  // ১. কুয়েরি থেকে পেজ এবং লিমিট নেওয়া (ডিফল্ট পেজ = ১, লিমিট = ১০)
  const page = Number(query.page) || 1;
<<<<<<< HEAD
  const limit = Number(query.limit) || 10;
=======
  const limit = Number(query.limit) || 12;
  console.log(page);
  console.log(limit);
  
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
  // ২. কতগুলো ডাটা স্কিপ (বাদ) করতে হবে তার হিসাব
  const skip = (page - 1) * limit;
  // ৩. ডাটাবেজ থেকে ডাটা খোঁজা এবং মোট প্রোডাক্টের সংখ্যা বের করা
  const products = await ProductSchema.find()
    .sort({ createdAt: -1 })
    .skip(skip)
<<<<<<< HEAD
    .limit(limit);
=======
    .limit(limit)
    .populate("faqs");
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

  const totalProducts = await ProductSchema.countDocuments();

  // ৪. মোট কতগুলো পেজ আছে তার হিসাব
  const totalPages = Math.ceil(totalProducts / limit);
  // ৫. কন্ট্রোলারের ব্যবহারের জন্য মেটাডাটা সহ রিটার্ন করা
  return {
    meta: {
      page,
      limit,
      totalProducts,
      totalPages,
    },
    data: products,
  };
};
<<<<<<< HEAD
=======

    
    
   
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

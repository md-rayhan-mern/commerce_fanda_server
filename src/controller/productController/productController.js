import ProductSchema from "../../../schema/product/product.js";
import { ApiResponse } from "../../../utils/apiResponse/apiResponse.js";
import { asyncRapper } from "../../../utils/asyncRapper/rapper.js";
import { AppError } from "../../../utils/customAppError/customError.js";
import { getProductService } from "../../services/productService/productService.js";

export const addProduct = asyncRapper(async (req, res, next) => {
    // ০. req.body থেকে ডেটা নেওয়া
    const { 
        id, image, name, price, oldPrice,
        discount, rating, review, breadcrumbs,
        galleryImage, brand 
    } = req.body;

    // ১. জরুরি ফিল্ডগুলোর ভ্যালিডেশন (এখানে 'throw' না করে 'return next' করা ১০০% নিরাপদ)
    if (!id || !name || !price || !image) {
        return next(new AppError(`id, name, price, and main image are required fields!`, 400));
    }

    // ২. ডুপ্লিকেট আইডি চেক (এখানেও 'return next' ব্যবহার করা হয়েছে যাতে ক্র্যাশ না করে)
    const isExist = await ProductSchema.findOne({ id: Number(id) }); // ডাবল সেফটির জন্য Number-এ কনভার্ট করা হলো
    if (isExist) {
        return next(new AppError(`Product with ID ${id} already exists!`, 400));
    }

    // ৩. মঙ্গোডিবি-তে নতুন প্রোডাক্ট তৈরি
    const newProduct = await ProductSchema.create({
        id,
        image,
        name,
        price,
        oldPrice: oldPrice || 0,
        discount: discount || 0,
        rating: rating || 0,
        review: review || 0,
        breadcrumbs,
        galleryImage: galleryImage || [],
        brand,
    });

    // ৪. ApiResponse দিয়ে সফল রেস্পন্স পাঠানো
    return res.status(201).json(
        new ApiResponse(201, newProduct, "Product uploaded successfully!")
    );
});

export const getProductsPagination = asyncRapper(async (req , res, next) => {
    console.log(req.query);
    
    // ১. রিকোয়েস্ট কুয়েরি (req.query) সার্ভিস ফাংশনে পাঠানো
    const result = await getProductService(req.query);
    // ২. ApiResponse দিয়ে মেটাডাটা ও প্রোডাক্ট লিস্ট ক্লায়েন্টকে পাঠানো
    return res.status(200).json(new ApiResponse(200, result.data, "Products fetched successfully!", result.meta ))
      // 💡 আপনার ApiResponse ক্লাসে মেটাডাটা পাস করার অপশন থাকলে এখানে দিতে পারেন


})

//find product by id

export const getProductsById = asyncRapper(async (req , res, next) => {
    const productId = req.params.id;
    
    const product = await ProductSchema.findById({_id : productId});
    
    if(!product) {
        return next(new AppError(`Do not find out ${productId} id product`, 404));
    }
    res.status(200).json(new ApiResponse(200, product, "Product fatched successfully", ));
})
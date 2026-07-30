import { modifyProduct } from "../../services/productService/productUpadteService.js";
import { asyncRapper } from "../../../utils/asyncRapper/rapper.js";
import { ApiResponse } from "../../../utils/apiResponse/apiResponse.js";
import { AppError } from "../../../utils/customAppError/customError.js";

export const updateProductFields = asyncRapper(async (req , res , next) => {
    const productId = req.params.id;
    
    const {     
        id,
      image,
      name,
      price,
      oldPrice,
      discount,
      rating,
      review,
      breadcrumbs,
      galleryImage,
      brand,
      stock,
      offer } = req.body;
    const updateData = {};
    
    if (id !== undefined) updateData.id = id;
    if (image !== undefined) updateData.image = image;
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (oldPrice !== undefined) updateData.oldPrice = oldPrice;
    if (discount !== undefined) updateData.discount = discount;
    if (rating !== undefined) updateData.rating = rating;
    if (review !== undefined) updateData.review = review;
    if (breadcrumbs !== undefined) updateData.breadcrumbs = breadcrumbs;
    if (galleryImage !== undefined) updateData.galleryImage = galleryImage;
    if (brand !== undefined) updateData.brand = brand;

     // 🛠️ 'stock' নেস্টেড অবজেক্টের জন্য ডট নোটেশন চেকিং
    if (stock) {
      if (stock.quantity !== undefined) updateData['stock.quantity'] = stock.quantity;
      if (stock.status !== undefined) updateData['stock.status'] = stock.status;
    }

     // 🛠️ 'offer' নেস্টেড অবজেক্টের জন্য ডট链 (Dot Notation) চেকিং
    if (offer) {
      if (offer.discountPercent !== undefined) updateData['offer.discountPercent'] = offer.discountPercent;
      if (offer.startDate !== undefined) updateData['offer.startDate'] = offer.startDate;
      if (offer.endDate !== undefined) updateData['offer.endDate'] = offer.endDate;
    }

      // ফ্রন্টেন্ড থেকে যদি কোনো ডাটাই না পাঠানো হয়
    if (Object.keys(updateData).length === 0) {
      throw new AppError("আপডেট করার জন্য কোনো তথ্য পাঠানো হয়নি!", 400)
    }

        // ২. সার্ভিস লেয়ার কল করে ডাটাবেজ আপডেট করা
    const updatedProduct = await modifyProduct(productId, updateData);

       if (!updatedProduct) {
      throw new AppError("প্রোডাক্টটি পাওয়া যায়নি!", 404);
    }

        // ৩. সফল রেসপন্স পাঠানো
    return res.status(200).json( new ApiResponse(200, updatedProduct, "প্রোডাক্টের নির্দিষ্ট ফিল্ডগুলো সফলভাবে আপডেট হয়েছে।" ));
    

});
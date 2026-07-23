import ProductSchema from "../../../schema/product/product.js";
import {ApiResponse} from "../../../utils/apiResponse/apiResponse.js";
import {asyncRapper} from "../../../utils/asyncRapper/rapper.js";
import {AppError} from "../../../utils/customAppError/customError.js"
export const addProduct = asyncRapper(async (req , res , next) => {
    const { id, image, name, price, oldPrice,
    discount, rating, review, breadcrumbs,
    galleryImage, brand} = req.body;
     // 1. জরুরি ফিল্ডগুলোর ভ্যালিডেশন (ভুল হলে ApiError এ চলে যাবে)
    if(!id || !name || !price || !image) {
      return next(new AppError(400, "id, name, price, and main image are required fields!"));
    }
     // 2. ডুপ্লিকেট আইডি চেক
     const isExist = await ProductSchema.findOne({id});
     if(isExist) {
        return next(new AppError(400, `Product with ID ${id} already exists!`))
     }
})
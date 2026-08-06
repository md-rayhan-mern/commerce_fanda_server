import { postFAQ } from "../../services/faq/faqService.js";
import { ApiResponse } from "../../../utils/apiResponse/apiResponse.js";
import { asyncRapper } from "../../../utils/asyncRapper/rapper.js";
import { AppError } from "../../../utils/customAppError/customError.js";

export const faqCotroller = asyncRapper(async (req , res , next) => {
    const userId = req.session?.userId;
    const {product, Q} = req.body;
    console.log(product);
    console.log(Q);
    console.log(userId);
    
    const createFaq = await postFAQ(product, userId, Q );

    res.status(201).json(new ApiResponse(201, createFaq, "Question created Successfully"))
    
})
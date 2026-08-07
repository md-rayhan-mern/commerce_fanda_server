import { postFAQ } from "../../services/faq/faqService.js";
import { ApiResponse } from "../../../utils/apiResponse/apiResponse.js";
import { asyncRapper } from "../../../utils/asyncRapper/rapper.js";
import { AppError } from "../../../utils/customAppError/customError.js";
import faqsSchema from "../../../schema/faqs/faqsSchema.js";

export const faqCotroller = asyncRapper(async (req , res , next) => {
    const userId = req.session?.userId;
    const {product, Q} = req.body;
    // console.log(product);
    // console.log(Q);
     console.log(userId);
    
    const createFaq = await postFAQ(product, userId, Q );

    const populateFAQ = await faqsSchema.findById(createFaq?._id).populate("user", "name");

    res.status(201).json(new ApiResponse(201, populateFAQ, "Question created Successfully"))
    
})
import { postFAQ } from "../../services/faq/faqService.js";
import { ApiResponse } from "../../../utils/apiResponse/apiResponse.js";
import { asyncRapper } from "../../../utils/asyncRapper/rapper.js";
import { AppError } from "../../../utils/customAppError/customError.js";

export const faqCotroller = asyncRapper(async (req , res , next) => {
    const {product, Q} = req.body;
    console.log(product);
    console.log(Q);
    
    const ctrateFaq = await postFAQ(product, Q );

    res.status(201).json(new ApiResponse(201, ctrateFaq, "Question created Successfully"))
    
})
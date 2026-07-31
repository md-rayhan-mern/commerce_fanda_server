import { postFAQ } from "../../services/faq/faqService.js";
import { ApiResponse } from "../../../utils/apiResponse/apiResponse.js";
import { asyncRapper } from "../../../utils/asyncRapper/rapper.js";

export const faqControl = asyncRapper(async (req, res, next) => {
  const { product, question } = req.body;
  console.log(product);
  console.log(question);

  const createQ = await postFAQ(product, question);
  res
    .status(201)
    .json(new ApiResponse(201, createQ, "question submited successfully"));
});

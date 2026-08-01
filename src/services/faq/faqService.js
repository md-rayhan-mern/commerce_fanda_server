import faqsSchema from "../../../schema/faqs/faqsSchema.js";
import productSchema from "../../../schema/product/product.js";
import { AppError } from "../../../utils/customAppError/customError.js";

export const postFAQ = async (productId, question) => {
  console.log(productId);

  if (!productId || !question) {
    throw new AppError("দয়া করে productId, এবং question প্রদান করুন।");
  }

  const productExist = await productSchema.findById(productId);
  if (!productExist) {
    throw new AppError("এই আইডি-র কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি।", 404);
  }

  const newFaq = await faqsSchema.create({ product: productId, question });
  await productSchema.findByIdAndUpdate(productId, {
    $push: { faqs: newFaq._id },
  });

  return newFaq;
};

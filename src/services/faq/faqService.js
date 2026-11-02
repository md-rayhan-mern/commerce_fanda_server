import faqsSchema from "../../../schema/faqs/faqsSchema.js";
import productSchema from "../../../schema/product/product.js";
import { AppError } from "../../../utils/customAppError/customError.js";

<<<<<<< HEAD
export const postFAQ = async (productId, question) => {
  console.log(productId);

  if (!productId || !question) {
    throw new AppError("দয়া করে productId, এবং question প্রদান করুন।");
  }
=======
export const postFAQ = async (productId, userId, Q) => {
  // console.log(productId);
  // console.log(Q);
  
//--------------//
  if(!productId ){
    throw new AppError("দয়া করে productId, এবং question প্রদান করুন।", 400 );
  }
  if(!Q){
     throw new AppError("দয়া করে আপনার প্রশ্নটি (Q) প্রদান করুন।", 400 );
  }
     // 💡 সিকিউরিটি চেক: ইউজার লগইন না থাকলে এখানেই আটকে দেবে এবং ৪MD১ এরর পাঠাবে
    if (!userId) {
        throw new AppError("দয়া করে প্রশ্ন করার আগে সফলভাবে লগইন করে নিন।", 401);
    }
//--------------//
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

  const productExist = await productSchema.findById(productId);
  if (!productExist) {
    throw new AppError("এই আইডি-র কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি।", 404);
  }

<<<<<<< HEAD
  const newFaq = await faqsSchema.create({ product: productId, question });
=======
  const newFaq = await faqsSchema.create({ product: productId, Q: Q, user:  userId});
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
  await productSchema.findByIdAndUpdate(productId, {
    $push: { faqs: newFaq._id },
  });

  return newFaq;
};

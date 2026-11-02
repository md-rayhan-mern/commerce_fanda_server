import User from "../../../schema/user/user.js";
import { ApiResponse } from "../../../utils/apiResponse/apiResponse.js";
import { AppError } from "../../../utils/customAppError/customError.js";
import { asyncRapper } from "../../../utils/asyncRapper/rapper.js";

export const getMeController = asyncRapper(async (req , res , next) => {
    const userId = req.session?.userId;
   console.log(userId);
   
    if(!userId) {
        throw new AppError("কোনো অ্যাক্টিভ সেশন পাওয়া যায়নি। দয়া করে লগইন করুন।", 401);
    }

    const user = await User.findById(userId).select("-password");

    if(!user){
        throw new AppError("এই সেশনের ইউজারটি ডাটাবেজে খুঁজে পাওয়া যায়নি।", 404);
    }

    res.status(200).json(new ApiResponse(200, user, "User session is still active"));
    
})
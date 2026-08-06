import {ApiResponse} from "../../../utils/apiResponse/apiResponse.js";
import {loginService} from "../../services/userCreateService/loginService.js";
import {asyncRapper} from "../../../utils/asyncRapper/rapper.js"

export const loginController = asyncRapper(async (req, res, next) => {
    const { identifier, password } = req.body;
   



    const response = await loginService(identifier, password);
    console.log(response._id);
    
    req.session.userId = response._id;
        const resUser = response.toObject();
        delete resUser.password;
    // 💡 এটি নিশ্চিত করবে যে কুকি পাঠানোর আগেই সেশন ডাটাবেজে সেভ হয়েছে
    req.session.save((err) => {
        if (err) return next(err);
        res.status(200).json(new ApiResponse(200, resUser, "Login successfully" ));
    });

    
    
});

import {ApiResponse} from "../../../utils/apiResponse/apiResponse.js";
import {loginService} from "../../services/userCreateService/loginService.js";
import {asyncRapper} from "../../../utils/asyncRapper/rapper.js"

export const loginController = asyncRapper(async (req, res, next) => {
    const { identifier, password } = req.body;
   



    const response = await loginService(identifier, password);

    
    const resUser = response.toObject();
    delete resUser.password;
    res.status(200).json(new ApiResponse(200, resUser, "Login successfully" ));
});

import { userService, userUpdateService } from "../../services/userCreateService/userCreateService.js";
import { AppError } from "../../../utils/customAppError/customError.js";
import {ApiResponse} from "../../../utils/apiResponse/apiResponse.js";
import {asyncRapper} from "../../../utils/asyncRapper/rapper.js"

export const userController = asyncRapper(async(req, res, next)=>{
    const {name, phone, email, password, addressType, areaDetails} = req.body;
    //console.log(areaDetails);
    const newUser = await userService({
        name, phone, email, password, addressType, areaDetails
    });
    const newUserObject = newUser.toObject();
    delete newUserObject.password; // Remove password from the response for security reasons

    res.status(201).json(new ApiResponse(201, newUserObject, "User created successfully"));
});

export const userUpdateController = asyncRapper(async(req, res, next) => {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await userUpdateService(userId, updateData);
    const updateUserObject = updatedUser.toObject();
    delete updateUserObject.password; // Remove password from the response for security reasons
    res.status(200).json(new ApiResponse(200, updateUserObject, "User updated successfully"));
});
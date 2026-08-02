import { userService, userUpdateService } from "../../services/userCreateService/userCreateService.js";
import { AppError } from "../../../utils/customAppError/customError.js";
import {ApiResponse} from "../../../utils/apiResponse/apiResponse.js";
import {asyncRapper} from "../../../utils/asyncRapper/rapper.js"

export const userController = asyncRapper(async(req, res, next)=>{
    const {name, phone, email, password, addressType, areaDetails} = req.body;
    console.log(areaDetails);
    const newUser = await userService({
        name, phone, email, password, addressType, areaDetails
    });

    res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});

export const userUpdateController = asyncRapper(async(req, res, next) => {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await userUpdateService(userId, updateData);
    console.log("Updated User:", updatedUser);
    res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
});
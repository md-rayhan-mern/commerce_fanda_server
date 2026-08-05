import Product from "../../../schema/user/user.js";
import {AppError} from "../../../utils/customAppError/customError.js";

export const loginService = async (identifier, password) => {

    if(!identifier || !password) {
        throw new AppError("Identifier and password are required", 400);
    }
    //DB  quiry to find user by email or phone
    const user = await Product.findOne(
        {
            $or: [
                { email: identifier },
                { phone: identifier },
            ]
        }
    );

    if(!user) {
        throw new AppError("User not found this email or phone", 404);
    };
    if(user.password !== password){
        throw new AppError("Invalid password", 401);
    }

    return user;
}
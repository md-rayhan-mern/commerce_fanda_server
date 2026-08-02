import User from "../../../schema/user/user.js";
import {AppError} from "../../../utils/customAppError/customError.js";

export const userService = async (userData) => {
    const {name , phone, email, password, addressType, areaDetails} = userData;

    const existingUser = await User.findOne({
        $or: [{email: email.toLowerCase()}, {phone: phone}]
    })
    if(existingUser){
        throw new AppError("User already exists with this email or phone number", 400);
    };

    const newUser = new User({
        name,
        phone,
        email: email.toLowerCase(),
        password,
        addresses: {addressType: addressType, areaDetails: areaDetails},
        role,
        profilePicture,
        birthDate,
        isVerified,
        isActive,
        gender,
    });
    
    return await newUser.save();
};

//userUpdate Service
export const userUpdateService = async (userId, updateData) => {
    const {email, phone} = updateData;
console.log(userId);
console.log("Update Data:", updateData);
    if(email || phone) {
        const query = [];
        if(email) query.push({email: email.toLowerCase()})
        if(phone) query.push({phone: phone})

    const existingUser = await User.findOne({
        $or: query,
        _id: { $ne: userId } // exclude the current user from the search
             });

        if(existingUser) {
            throw new AppError("User already exists with this email or phone number", 400);
            }
    }

    const updatedUser  = await User.findByIdAndUpdate(userId, {
        $set: {
            ...updateData
        }
    }, {new: true, runValidators: true});

   if(!updatedUser) {
    throw new AppError("User not found", 404);
   };

   return updatedUser;
}
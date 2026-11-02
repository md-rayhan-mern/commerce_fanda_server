import User from "../../../schema/user/user.js";
import {AppError} from "../../../utils/customAppError/customError.js";

export const userService = async (userData) => {
    const {name , phone, email, password, addressType, areaDetails, role, profilePicture, birthDate,isVerified,isActive,gender} = userData;

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
    const {email, phone,addresses} = updateData;
// console.log(userId);
// console.log("Update Data:", updateData);
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

        // ২. অ্যাড্রেস হ্যান্ডেল করার প্রফেশনাল লজিক
    if (addresses && addresses.length > 0) {
        const targetAddress = addresses[0]; // ফ্রন্টএন্ড থেকে পাঠানো অ্যাড্রেস অবজেক্ট

        if (targetAddress._id) {
            // 👉 কেস এ: যদি _id থাকে, তার মানে নির্দিষ্ট অ্যাড্রেসটি UPDATE করতে হবে
            await User.updateOne(
                { _id: userId, "addresses._id": targetAddress._id },
                { 
                    $set: { 
                        "addresses.$.addressType": targetAddress.addressType,
                        "addresses.$.areaDetails": targetAddress.areaDetails
                        // ভবিষ্যতে অন্য ফিল্ড অন করলে সেগুলোও এখানে কমা দিয়ে যোগ করবেন
                    } 
                }
            );
        } else {
            // 👉 কেস বি: যদি _id না থাকে, তার মানে নতুন অ্যাড্রেস ADD/PUSH করতে হবে
            await User.findByIdAndUpdate(userId, {
                $push: { addresses: targetAddress }
            });
        }
        
        // addresses ফিল্ডটি মূল updateData থেকে ডিলেট করে দিচ্ছি, 
        // যেন নিচে আবার $set হয়ে ওভাররাইট না হয়ে যায়।
        delete updateData.addresses;
    }

    const updatedUser  = await User.findByIdAndUpdate(userId, {
        $set: {
            ...updateData
        }
    }, {returnDocument: 'after', runValidators: true});

   if(!updatedUser) {
    throw new AppError("User not found", 404);
   };

   return updatedUser;
}
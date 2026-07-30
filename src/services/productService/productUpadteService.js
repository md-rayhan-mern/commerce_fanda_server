import ProductSchema from "../../../schema/product/product.js";

export const modifyProduct = async (productId, updateData) => {

    const updatedProduct = await ProductSchema.findByIdAndUpdate(productId, { $set: updateData}, {returnDocument: 'after', runValidators: true});
    return updatedProduct;
};
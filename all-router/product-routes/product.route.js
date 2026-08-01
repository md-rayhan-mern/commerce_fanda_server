import {Router} from "express";
import { addProduct, getProductsPagination, getProductsById, updateProductFields } from "../../src/controller/productController/productController.js";
export const productRouter = Router();

productRouter.post("/add", addProduct);
productRouter.get("/get/", getProductsPagination)
productRouter.get("/get/:id", getProductsById);
productRouter.patch("/update/:id", updateProductFields)


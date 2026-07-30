import {Router} from "express";
import { addProduct, getProductsPagination } from "../../src/controller/productController/productController.js";
import { updateProductFields } from "../../src/controller/productController/productUpdateController.js";
export const productRouter = Router();

productRouter.post("/add", addProduct);
productRouter.get("/get/", getProductsPagination)
productRouter.patch("/update/:id", updateProductFields)


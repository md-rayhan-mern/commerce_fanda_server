import {Router} from "express";
import { addProduct, getProductsPagination } from "../../src/controller/productController/productController.js";
export const productRouter = Router();

productRouter.post("/add", addProduct);
productRouter.get("/get/", getProductsPagination)


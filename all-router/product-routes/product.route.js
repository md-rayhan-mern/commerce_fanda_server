import {Router} from "express";
<<<<<<< HEAD
import { addProduct, getProductsPagination } from "../../src/controller/productController/productController.js";
import { updateProductFields } from "../../src/controller/productController/productUpdateController.js";
=======
import { addProduct, getProductsPagination, getProductsById, updateProductFields } from "../../src/controller/productController/productController.js";
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
export const productRouter = Router();

productRouter.post("/add", addProduct);
productRouter.get("/get/", getProductsPagination)
<<<<<<< HEAD
=======
productRouter.get("/get/:id", getProductsById);
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
productRouter.patch("/update/:id", updateProductFields)


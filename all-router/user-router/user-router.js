import { Router } from "express";
import {userController, userUpdateController} from "../../src/controller/userController/userController.js";
import {loginController} from "../../src/controller/userController/loginController.js";

export const userRouter = Router();


userRouter.post("/create", userController);
userRouter.post("/login", loginController);
userRouter.patch("/update/:id", userUpdateController); 


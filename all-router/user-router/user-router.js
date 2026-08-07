import { Router } from "express";
import {userController, userUpdateController} from "../../src/controller/userController/userController.js";
import {loginController} from "../../src/controller/userController/loginController.js";
import { getMeController } from "../../src/controller/userController/getMeController.js";

export const userRouter = Router();


userRouter.post("/create", userController);
userRouter.post("/login", loginController);
userRouter.get("/getme" , getMeController);
userRouter.patch("/update/:id", userUpdateController); 


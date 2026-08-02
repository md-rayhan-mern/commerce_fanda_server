import { Router } from "express";
import {userController, userUpdateController} from "../../src/controller/userController/userController.js";

export const userRouter = Router();


userRouter.post("/create", userController);
userRouter.patch("/update/:id", userUpdateController); 


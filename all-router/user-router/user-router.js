import { Router } from "express";
<<<<<<< HEAD

const user = Router();
user.get("/user", (req, res, next) => {
  res.status(200).json({
    data: "this is successfull data",
    status: "success",
  });
});
export default user;
=======
import {userController, userUpdateController} from "../../src/controller/userController/userController.js";
import {loginController} from "../../src/controller/userController/loginController.js";
import { getMeController } from "../../src/controller/userController/getMeController.js";

export const userRouter = Router();


userRouter.post("/create", userController);
userRouter.post("/login", loginController);
userRouter.get("/getme" , getMeController);
userRouter.patch("/update/:id", userUpdateController); 

>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

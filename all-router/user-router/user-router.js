import { Router } from "express";

const user = Router();
user.get("/user", (req, res, next) => {
  res.status(200).json({
    data: "this is successfull data",
    status: "success",
  });
});
export default user;

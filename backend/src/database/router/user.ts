import { Router } from "express";
import { userCreateController } from "../controller/userController";

const userRouter:Router = Router();
userRouter.post('/', userCreateController)

export default userRouter
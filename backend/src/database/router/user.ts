import { Router } from "express";
import { userCreateController } from "../controller/userController";
import validateUser from "../middlewares/validateUser";

const userRouter:Router = Router();
userRouter.post('/', validateUser ,userCreateController)

export default userRouter
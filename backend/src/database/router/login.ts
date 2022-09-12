import { Router } from "express";
import { userLoginController } from "../controller/userController";
import loginValidate from "../middlewares/validateLogin";

const loginRouter: Router = Router();
loginRouter.post("/", loginValidate, userLoginController);

export default loginRouter;

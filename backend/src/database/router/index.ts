import { Router } from "express";
import loginRouter from "./login";
import userRouter from "./user";

const routerIndex: Router = Router();

routerIndex.use('/user', userRouter)
routerIndex.use('/login', loginRouter)

export default routerIndex
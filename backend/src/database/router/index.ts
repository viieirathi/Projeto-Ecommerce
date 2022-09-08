import { Router } from "express";
import userRouter from "./user";

const routerIndex:Router = Router();

routerIndex.use('/user', userRouter)

export default routerIndex
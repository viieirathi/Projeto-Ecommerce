import { Router } from 'express';
import categoryRouter from './category';
import loginRouter from './login';
import productRouter from './product';
import userRouter from './user';

const routerIndex: Router = Router();

routerIndex.use('/user', userRouter);
routerIndex.use('/login', loginRouter);
routerIndex.use('/product', productRouter);
routerIndex.use('/category', categoryRouter);

export default routerIndex;

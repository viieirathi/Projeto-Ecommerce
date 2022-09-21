import { Router } from 'express';
import { productCreateController, productGetAllController } from '../controller/productController';
import { authenticateToken } from '../middlewares/authToken';

const productRouter: Router = Router();
productRouter.post('/', authenticateToken, productCreateController);
productRouter.get('/', productGetAllController);

export default productRouter;

import { Router } from 'express';
import { productCreateController, productGetAllController, productGetIdController } from '../controller/productController';
import { authenticateToken } from '../middlewares/authToken';

const productRouter: Router = Router();
productRouter.post('/', authenticateToken, productCreateController);
productRouter.get('/', authenticateToken, productGetAllController);
productRouter.get('/:id', authenticateToken, productGetIdController);

export default productRouter;

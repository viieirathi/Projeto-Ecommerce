import { Router } from 'express';
import {
  productCreateController,
  productDeleteController,
  productGetAllController,
  productGetIdController,
  productUpdateController,
} from '../controller/productController';
import { authenticateToken } from '../middlewares/authToken';

const productRouter: Router = Router();
productRouter.post('/', authenticateToken, productCreateController);
productRouter.get('/', authenticateToken, productGetAllController);
productRouter.get('/:id', authenticateToken, productGetIdController);
productRouter.put('/:id', authenticateToken, productUpdateController);
productRouter.delete('/:id', authenticateToken, productDeleteController);

export default productRouter;

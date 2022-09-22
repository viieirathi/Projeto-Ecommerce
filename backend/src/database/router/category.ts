import { Router } from 'express';
import controller from '../controller/categoryController';
import { authenticateToken } from '../middlewares/authToken';

const categoryRouter: Router = Router();
categoryRouter.post('/', authenticateToken, controller.categoryCreateController);

export default categoryRouter;

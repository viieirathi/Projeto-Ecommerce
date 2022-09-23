import { NextFunction, Request, Response } from 'express';
import {
  productServiceCreate, productServiceGetAll, productServiceGetId, productServiceUpdate,
} from '../service/productServices';

const productCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name_product, quantity, price, category, image, isvalidToken,
    } = req.body;

    const { id } = isvalidToken;
    const { code, data } = await productServiceCreate({
      name_product,
      quantity,
      price,
      image,
      user_id: id,
      name_category: category,
    });
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

const productGetAllController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, data } = await productServiceGetAll();
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

const productGetIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { code, data } = await productServiceGetId(Number(id));
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

const productUpdateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name_product, quantity, price } = req.body;
    const { id } = req.params;
    const { code, data } = await productServiceUpdate(
      {
        name_product, quantity, price,
      },
      Number(id),
    );
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

export {
  productCreateController,
  productGetAllController,
  productGetIdController,
  productUpdateController,
};

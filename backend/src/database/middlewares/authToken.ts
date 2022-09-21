import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken, SECRET } from '../utils/jwt';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token não encontrado' });
    }
    const isvalidToken = verifyToken(token, SECRET);
    req.body = { ...req.body, isvalidToken };
    if (!isvalidToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token inválido' });
    }
  } catch (error) {
    if (error instanceof Error && error.name.includes('Token')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Token Inválido',
      });
    }
  }
  return next();
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token não encontrado' });
    }
    const { role } = verifyToken(authorization, SECRET);
    return res.status(StatusCodes.OK).json(role);
  } catch (error) {
    if (error instanceof Error && error.name.includes('Token')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Token Inválido',
      });
    }
  }
  return next();
};

export { authenticateToken, validateToken };

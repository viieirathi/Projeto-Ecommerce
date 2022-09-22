import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ICategory } from '../interfaces/ICategory';

const prisma = new PrismaClient();

const categoryServiceCreate = async (category: ICategory) => {
  const { name_category, role } = category;
  if (role !== 'ADMIN') {
    return {
      code: StatusCodes.UNAUTHORIZED,
      data: { message: 'Criação de categoria negada' },
    };
  }
  await prisma.category.create({ data: { name_category } });
  return {
    code: StatusCodes.CREATED,
    data: { message: 'Categoria criada com sucesso' },
  };
};

export default { categoryServiceCreate };

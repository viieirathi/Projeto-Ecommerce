import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { IProduct } from '../interfaces/IProduct';

const prisma = new PrismaClient();

const productServiceCreate = async (product: IProduct) => {
  const {
    name_category, id_user, quantity, price, image, name_product,
  } = product;
  const categoryFind = await prisma.category.findFirst({
    where: { name_category },
  });
  if (!categoryFind) {
    return {
      code: StatusCodes.UNAUTHORIZED,
      data: { message: 'Categoria não existe' },
    };
  }
  await prisma.product.create({
    data: {
      name_product,
      quantity,
      price,
      image,
      category: { connect: { id: categoryFind.id } },
      id_user: { connect: { id: id_user } },
    },
  });
  return {
    code: StatusCodes.CREATED,
    data: { message: 'Produto criado com sucesso' },
  };
};

const productServiceGetAll = async () => {
  const productGetAll = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name_category: true,
        },
      },
    },
  });
  return { code: StatusCodes.OK, data: productGetAll };
};

export { productServiceCreate, productServiceGetAll };

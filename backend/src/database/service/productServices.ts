import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { IProduct } from '../interfaces/IProduct';

const prisma = new PrismaClient();

const productServiceCreate = async (product: IProduct) => {
  const {
    name_category, user_id, quantity, price, image, name_product,
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
      id_user: { connect: { id: user_id } },
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

const productServiceGetId = async (id: number) => {
  const productId = await prisma.product.findUnique({
    where: { id },
    include: {
      id_user: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!productId) {
    return {
      code: StatusCodes.NOT_FOUND,
      data: { message: 'Id não encontrado' },
    };
  }

  return { code: StatusCodes.OK, data: productId };
};

export { productServiceCreate, productServiceGetAll, productServiceGetId };

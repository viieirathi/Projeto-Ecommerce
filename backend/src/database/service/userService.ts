import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/IUser";
import StatusCode from "http-status-codes";
import { tokenAssign } from "../utils/jwt";

export const prisma = new PrismaClient();

const userServiceCreate = async (user: IUser) => {
  const { name, email } = user;
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (userExist)
    return {
      code: StatusCode.UNAUTHORIZED,
      data: { message: "Usuário já existe" },

      
    };
  const token = tokenAssign({ name, email });
  await prisma.user.create({ data: user });
  return { code: StatusCode.CREATED, data: token };
};

export { userServiceCreate };

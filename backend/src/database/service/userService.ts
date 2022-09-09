import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/IUser";
import StatusCode from "http-status-codes";

const prisma = new PrismaClient();

const userServiceCreate = async (user: IUser) => {
  await prisma.user.create({ data: user });
  return { code: StatusCode.CREATED, data: "Usuário criado com sucesso" };
};

export { userServiceCreate };

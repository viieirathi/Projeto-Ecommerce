import { PrismaClient } from "@prisma/client";
import { ILogin, IUser } from "../interfaces/IUser";
import StatusCode from "http-status-codes";
import { tokenAssign } from "../utils/jwt";
import * as bcryptjs from "bcryptjs";

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

const userServiceLogin = async (user: ILogin) => {
  const { email, password } = user;
  const userLogin = await prisma.user.findUnique({ where: { email } });
  if (!userLogin)
    return {
      code: StatusCode.UNAUTHORIZED,
      data: { message: "E-mail incorreto" },
    };
  const passCript = await bcryptjs.compare(password, userLogin.password);
  if (!passCript)
    return {
      code: StatusCode.UNAUTHORIZED,
      data: { message: "Senha incorreta" },
    };
  const { name } = userLogin;
  const token = tokenAssign({
    email,
    name,
  });
  return { code: StatusCode.ACCEPTED, data: token };
};

export { userServiceCreate, userServiceLogin };

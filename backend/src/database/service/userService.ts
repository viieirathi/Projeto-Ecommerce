import { PrismaClient } from '@prisma/client';
import StatusCode from 'http-status-codes';
import * as bcryptjs from 'bcryptjs';
import { ILogin, IUser } from '../interfaces/IUser';
import { tokenAssign } from '../utils/jwt';

export const prisma = new PrismaClient();

const userServiceCreate = async (user: IUser) => {
  const { email } = user;
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (userExist) {
    return {
      code: StatusCode.UNAUTHORIZED,
      data: { message: 'Usuário já existe' },
    };
  }
  await prisma.user.create({ data: user });
  return {
    code: StatusCode.CREATED,
    data: { message: 'Usuário criado com sucesso' },
  };
};

const userServiceLogin = async (user: ILogin) => {
  const { email, password } = user;
  const userLogin = await prisma.user.findUnique({ where: { email } });
  if (!userLogin) {
    return {
      code: StatusCode.UNAUTHORIZED,
      data: { message: 'E-mail incorreto' },
    };
  }
  const passCript = await bcryptjs.compare(password, userLogin.password);
  if (!passCript) {
    return {
      code: StatusCode.UNAUTHORIZED,
      data: { message: 'Senha incorreta' },
    };
  }
  const { name, id, role } = userLogin;
  const token = tokenAssign({
    email,
    name,
    id,
    role,
  });
  return { code: StatusCode.ACCEPTED, data: token };
};

export { userServiceCreate, userServiceLogin };

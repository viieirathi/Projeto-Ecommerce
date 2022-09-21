export type Role = 'USER' | 'ADMIN';

export interface IUser {
  id?: number;
  name: string;
  password: string;
  email: string;
  role: Role;
  image: string;
}

export interface ILogin {
  email: string,
  password: string
}

import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs";

const SECRET = fs.readFileSync("jwt.evaluation.key");

const tokenAssign = (token: string) => {
  return jwt.sign(token, SECRET, { expiresIn: "1d" });
};

const verifyToken = (token: string, SECRET: Buffer) => {
  return jwt.verify(token, SECRET) as JwtPayload;
};

export { tokenAssign, verifyToken, SECRET };

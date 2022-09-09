import jwt, { JwtPayload } from "jsonwebtoken";
import * as fs from "fs";

const SECRET = fs.readFileSync("jwt.evaluation.key", "utf-8");

const tokenAssign = (token: { name: string; email: string }) => {
  return jwt.sign(token, SECRET, { expiresIn: "1d" });
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export { tokenAssign, verifyToken, SECRET };

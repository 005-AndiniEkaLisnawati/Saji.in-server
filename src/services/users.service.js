import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (email, password) => {
  const user = await prisma.user.findFirst({
    where: { email, password }
  });
  if (user) {
    const token = jwt.sign({ id: user.id_user, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  }
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return null;
}





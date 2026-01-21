import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const login = async (email, password) => {
  return await prisma.user.findFirst({
    where: { email, password }
  });
}

export default { login };


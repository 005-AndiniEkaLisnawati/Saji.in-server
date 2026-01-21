import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCustomer = async (customerData) => {
  return await prisma.customer.create({
    data: {
        name: customerData.name
    }
  });
}
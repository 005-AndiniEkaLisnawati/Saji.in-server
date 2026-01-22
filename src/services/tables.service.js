import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTable = async (table_number) => {
  const qr_link = `https://saji-in-server-y9x1.vercel.app/?table=${table_number}`;
  return await prisma.table.create({
    data: { table_number, qr_link },
  });
};

export const getAllTables = async () => {
  return await prisma.table.findMany();
};

export const deleteTable = async (id_table) => {
  return await prisma.table.delete({
    where: { id_table: parseInt(id_table) },
  });
};

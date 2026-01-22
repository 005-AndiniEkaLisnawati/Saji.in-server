import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = async (categoryData) => {
  return await prisma.category.create({
    data: {
        category_name: categoryData.category_name
    }
  });
}

export const getAllCategories = async () => {
  return await prisma.category.findMany();
}

export const getCategoryById = async (id_category) => {
  return await prisma.category.findUnique({
    where: { id_category: parseInt(id_category) }
  });
}

export const deleteCategory = async (id_category) => {
  return await prisma.category.delete({
    where: { id_category: parseInt(id_category) }
  });
}

export const updateCategory = async (id_category, updateData) => {
    return await prisma.category.update({
    where: { id_category: parseInt(id_category) },
    data: {
        category_name: updateData.category_name
    }
  });
}
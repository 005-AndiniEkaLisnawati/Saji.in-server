import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const createMenu = async (menuData) => {
  return await prisma.menu.create({
    data: {
        id_category: menuData.id_category,
        menu_name: menuData.menu_name,
        description: menuData.description,
        price: parseInt(menuData.price),
        image: menuData.image,
        is_available: menuData.is_available === undefined ? true : menuData.is_available
    }
  });
}

export const getAllMenus = async () => {
  return await prisma.menu.findMany();
}

export const updateMenu = async (id_menu, updateData) => {
  return await prisma.menu.update({
    where: { id_menu: parseInt(id_menu) },
    data: { 
        menu_name: updateData.menu_name,
        description: updateData.description,
        category: updateData.category  ? parseInt(updateData.category) : undefined,
        price: updateData.price ? parseInt(updateData.price) : undefined,
        image: updateData.image ,
        is_available: updateData.is_available !== undefined ? updateData.is_available : undefined
    }
  });
}


export const getMenuById = async (id_menu) => {
  return await prisma.menu.findUnique({
    where: { id_menu: parseInt(id_menu) }
  });
}

export const deleteMenu = async (id_menu) => {
  return await prisma.menu.delete({
    where: { id_menu: parseInt(id_menu) }
  });
}

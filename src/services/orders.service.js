import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async (orderData) => {
  return await prisma.order.create({
    data: {
      id_table: parseInt(orderData.id_table),
      id_customer: parseInt(orderData.id_customer),
      total_price: parseInt(orderData.total_price),
      order_status: 'pending',
      items: {
        create: orderData.items.map(item => ({
          id_menu: parseInt(item.id_menu),
          quantity: parseInt(item.quantity),
          note: item.note || ""
        }))
      }
    },
    include: {
      items: true 
    }
  });
}
export const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            table: true,
            customer: true,
            items: true,
        },
    });
}

export const updateOrder = async (id_order, updateData) => {
    return await prisma.order.update({
        where: { id_order: parseInt(id_order) },
        data: {
            id_table: updateData.id_table ? parseInt(updateData.id_table) : undefined,
            id_customer: updateData.id_customer ? parseInt(updateData.id_customer) : undefined,
            total_price: updateData.total_price ? parseInt(updateData.total_price) : undefined,
            status: updateData.status,
        },
    });
}

export const getOrderById = async (id_order) => {
    return await prisma.order.findUnique({
        where: { id_order: parseInt(id_order) },
        include: {
            table: true,
            customer: true,
            items: {include: { menu: { select: { menu_name: true } } }},
        },
    });
}

export const deleteOrder = async (id_order) => {
    return await prisma.order.delete({
        where: { id_order: parseInt(id_order) },
    });
}

export const updateStatus = async (id_order, status) => {
    return await prisma.order.update({
        where: { id_order: parseInt(id_order) },
        data: { order_status: status },
    });
}
export const queueBarista = async () => {
    return await prisma.order.findMany({
        where: { order_status: { in: ['processing', 'ready'] } },
        orderBy: { order_time: 'asc' },
        include: {
            table: true,
            customer: true,
            items: {
                include: {
                    menu: {
                        select: {
                            menu_name: true 
                        }
                    }
                }
            },
        },
    });
}

export const getByCustomers = async (id_customer) => {
    return await prisma.order.findMany({
        where: {
            id_customer: parseInt(id_customer) 
        },
        include: {
            items: {
                include: {
                    menu: true 
                }
            },
            table: true 
        },
        orderBy: {
            order_time: 'desc'
        }
    });
};
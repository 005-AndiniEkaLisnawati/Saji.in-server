import {createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder, updateStatus} from "../services/orders.service.js";

export const addOrder = async (req, res) => {
    const { id_table, id_customer, total_price, status, items } = req.body;
    try {
        const newOrder = await createOrder({
            id_table: parseInt(id_table),
            id_customer: parseInt(id_customer),
            total_price: parseInt(total_price),
            status,
            items
        });
        res.status(201).json({
            message: "Order created successfully",
            data: newOrder,
        });
    } catch (error) {
        console.error("Error pada createOrder Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }

};

export const getOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json({
            message: "Orders retrieved successfully",
            data: orders,
        });
    } catch (error) {
        console.error("Error pada getOrders Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }

};

export const editOrder = async (req, res) => {
    const { id_order } = req.params;
    const { id_table, id_customer, total_price, order_status } = req.body;
    try {
        const updatedOrder = await updateOrder(id_order, {
            id_table: id_table ? parseInt(id_table) : undefined,
            id_customer: id_customer ? parseInt(id_customer) : undefined,
            total_price: total_price ? parseInt(total_price) : undefined,
            order_status,
        });
        res.status(200).json({
            message: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error("Error pada updateOrder Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }

};

export const getOrder = async (req, res) => {
    const { id_order } = req.params;
    try {
        const order = await getOrderById(id_order);
        res.status(200).json({
            message: "Order retrieved successfully",
            data: order,
        });
    } catch (error) {
        console.error("Error pada getOrderById Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }

};

export const deleteOne = async (req, res) => {
    const { id_order } = req.params;
    try {
        const deletedOrder = await deleteOrder(id_order);
        res.status(200).json({
            message: "Order deleted successfully",
            data: deletedOrder,
        });
    } catch (error) {
        console.error("Error pada deleteOrder Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    const { id_order } = req.params;
    const { order_status } = req.body;
    try {
        const updatedOrder = await updateStatus(id_order, order_status);
        res.status(200).json({
            message: "Order status updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error("Error pada updateOrderStatus Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
import express from "express";
import {authorize, authenticate} from "../middlewares/auth.middleware.js";
import {
    addOrder,
    getOrders,
    editOrder,
    deleteOne,
    getOrder,
    updateOrderStatus
} from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/orders", addOrder);
router.get("/orders", getOrders);
router.put("/orders/:id_order", editOrder);
router.delete("/orders/:id_order", deleteOne);
router.get("/orders/:id_order", getOrder);
router.patch("/orders/:id_order/status", updateOrderStatus);


export default router;
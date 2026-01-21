import { addCustomer } from "../controllers/customers.controller.js";
import express from "express";
const router = express.Router();

router.post("/api/customers", addCustomer);

export default router;
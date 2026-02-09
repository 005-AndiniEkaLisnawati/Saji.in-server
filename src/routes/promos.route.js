import express from "express";
import {getPromos, createPromo, updatePromo, deletePromo} from '../controllers/promos.controller.js'

const router = express.Router();
router.post("/promos", createPromo)
router.get("/promos", getPromos)
router.put("/promos/:id", updatePromo)
router.delete("/promos/:id", deletePromo)

export default router;
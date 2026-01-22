import express from "express";
import {authorize, authenticate} from "../middlewares/auth.middleware.js";

import {
    addTable,
    getTables,
    removeTable,
} from "../controllers/tables.controller.js";

const router = express.Router();

router.post("/tables", authenticate, authorize(["admin", "barista"]), addTable);
router.get("/tables", getTables);
router.delete("/tables/:id_table", authenticate, authorize(["admin", "barista"]), removeTable);

export default router;
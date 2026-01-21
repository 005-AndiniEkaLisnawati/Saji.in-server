import { addMenu, getMenus, updateMenu, deleteMenu } from "../controllers/menus.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import express from "express";
const router = express.Router();

router.post("/api/menus", upload.single("image"), addMenu);
router.get("/api/menus", getMenus);
router.put("/api/menus/:id_menu", upload.single("image"), updateMenu);
router.delete("/api/menus/:id_menu", deleteMenu);

export default router;
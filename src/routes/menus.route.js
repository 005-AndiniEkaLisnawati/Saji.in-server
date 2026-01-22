import { addMenu, getMenus, updateMenu, deleteMenu } from "../controllers/menus.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import express from "express";
const router = express.Router();

router.post("/api/menus", authenticate, authorize(["admin"]), upload.single("image"), addMenu);
router.get("/api/menus", getMenus);
router.put("/api/menus/:id_menu", authenticate, authorize(["admin"]), upload.single("image"), updateMenu);
router.delete("/api/menus/:id_menu", authenticate, authorize(["admin"]), deleteMenu);

export default router;
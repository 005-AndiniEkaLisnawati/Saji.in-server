import { addMenu, getMenus, updateMenu, deleteMenu } from "../controllers/menus.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import express from "express";
const router = express.Router();

router.post("/menus", authenticate, authorize(["admin", "barista"]), upload.single("image"), addMenu);
router.get("/menus", getMenus);
router.put("/menus/:id_menu", authenticate, authorize(["admin", "barista"]), upload.single("image"), updateMenu);
router.delete("/menus/:id_menu", authenticate, authorize(["admin", "barista"]), deleteMenu);

export default router;
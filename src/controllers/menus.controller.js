import { supabase } from "../config/supabase.js";
import * as menuService from "../services/menus.service.js";

export const addMenu = async (req, res) => {
  try {
    const { id_category, menu_name, price, description } = req.body;
    const file = req.file;

    if (!menu_name || !price || !id_category) {
      return res.status(400).json({
        message: "Field menu_name, price, dan id_category wajib diisi",
      });
    }

    let imageUrl = null;

    if (file) {
      const fileExt = file.originalname.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `menus/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("Saji.in")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        return res.status(500).json({
          message: "Gagal upload gambar ke Supabase",
          error: uploadError.message,
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from("Saji.in")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    const menuData = {
      id_category: parseInt(id_category),
      menu_name,
      price: parseInt(price),
      description,
      image: imageUrl,
    };

    const newMenu = await menuService.createMenu(menuData);

    res.status(201).json({
      message: "Menu berhasil ditambahkan",
      data: newMenu,
    });
  } catch (error) {
    console.error("Error pada addMenu Controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMenus = async (req, res) => {
  try {
    const menus = await menuService.getAllMenus();

    res.status(200).json({
      message: "Menus retrieved successfully",
      data: menus,
    });
  } catch (error) {
    console.error("Error pada getMenus Controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id_menu } = req.params;
    const file = req.file;

    if (
      !req.body.menu_name &&
      !req.body.price &&
      !req.body.description &&
      !file
    ) {
      return res
        .status(400)
        .json({
          message:
            "Minimal satu field (menu_name, price, description, atau image) harus diupdate",
        });
    }

    const oldMenu = await menuService.getMenuById(id_menu);
    if (!oldMenu) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }
    let imageUrl = oldMenu.image;
    if (file) {
      if (oldMenu.image) {
        const oldFileName = oldMenu.image.split("/").pop();
        await supabase.storage.from("Saji.in").remove([`menus/${oldFileName}`]);
      }

      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = `menus/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("Saji.in")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({
          message: "Gagal upload gambar ke Supabase",
          error: uploadError.message,
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from("Saji.in")
        .getPublicUrl(filePath);
      imageUrl = publicUrlData.publicUrl;
    }

    const updateData = { ...req.body, image: imageUrl };
    const result = await menuService.updateMenu(id_menu, updateData);

    res.status(200).json({
      message: "Menu updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error pada updateMenu Controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id_menu } = req.params;

    const menu = await menuService.getMenuById(id_menu);

    if (!menu) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    if (menu.image) {
      const fileName = menu.image.split("/").pop();
      const filePath = `menus/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from("Saji.in")
        .remove([filePath]);

      if (storageError) {
        console.error("Gagal menghapus gambar di Storage:", storageError);
        return res.status(500).json({
          message: "Gagal menghapus gambar di Storage",
          error: storageError.message,
        });
      }
    }

    await menuService.deleteMenu(id_menu);

    res.status(200).json({
      message: "Menu dan gambar berhasil dihapus",
    });
  } catch (error) {
    console.error("Error pada deleteMenu Controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

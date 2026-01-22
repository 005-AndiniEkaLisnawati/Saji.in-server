import {
  createTable,
  deleteTable,
  getAllTables,
} from "../services/tables.service.js";

export const addTable = async (req, res) => {
  const { table_number } = req.body;
  const intTableNumber = parseInt(table_number);
  try {
    const newTable = await createTable(intTableNumber);
    res.status(201).json({
      message: "Table created successfully",
      data: newTable,
    });
  } catch (error) {
    console.error("Error pada createTable Controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getTables = async (req, res) => {
  try {
    const tables = await getAllTables();
    res.status(200).json({
      message: "Tables retrieved successfully",
      data: tables,
    });
  } catch (error) {
    console.error("Error pada getAllTables Controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const removeTable = async (req, res) => {
  const { id_table } = req.params;
  try {
    const deletedTable = await deleteTable(id_table);
    res.status(200).json({
      message: "Table deleted successfully",
      data: deletedTable,
    });
  } catch (error) {
    console.error("Error pada deleteTable Controller:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

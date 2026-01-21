import { createCustomer } from "../services/customers.service.js";

export const addCustomer = async (req, res) => {
    const { name } = req.body;
    try {
        const newCustomer = await createCustomer({ name });
        res.status(201).json({
            message: "Customer created successfully",
            data: newCustomer,
        });
    }   catch (error) { 
        console.error("Error pada createCustomer Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


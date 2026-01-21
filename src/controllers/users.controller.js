import { login } from "../services/users.service.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { loginUser };

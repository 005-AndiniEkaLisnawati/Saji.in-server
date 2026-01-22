import express from 'express';
import { loginUser } from '../controllers/users.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();



router.post('/api/login', loginUser);
export default router;
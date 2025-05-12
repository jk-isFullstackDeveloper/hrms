import express from 'express';
const router = express.Router();
import { login, getAllUsers } from '../../controller/userController.js';
import { verifyAuth } from '../../middleware/auth.js';
router.post('/login', login);
router.get('/list',verifyAuth, getAllUsers);

export default router;
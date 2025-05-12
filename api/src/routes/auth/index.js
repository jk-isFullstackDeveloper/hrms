import express from "express";
import { createUser, login } from '../../controller/userController.js';
const router = express.Router();

router.get("/",   (req, res) => {

    res.json({ message: "success" })
});

router.post('/login', login);
router.post('/register', createUser)

export default router;
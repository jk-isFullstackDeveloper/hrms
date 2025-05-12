import express from "express";
import { getPrivateMessages, getGroupMessages } from "../../controller/messageController.js";
import { verifyAuth } from "../../middleware/auth.js";
const router = express.Router();

router.get("/private/:user1/:user2", verifyAuth, getPrivateMessages);
router.get("/group/:groupId", verifyAuth, getGroupMessages);

export default router;

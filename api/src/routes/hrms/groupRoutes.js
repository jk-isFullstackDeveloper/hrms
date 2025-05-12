import express from "express";
import { createGroup, getGroup } from "../../controller/groupController.js";
import { verifyAuth } from "../../middleware/auth.js";
const router = express.Router();

router.post("/create",verifyAuth, createGroup);
router.get("/list",verifyAuth, getGroup);

export default router;

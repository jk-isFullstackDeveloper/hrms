import express from "express";
import authRoutes from "./auth/index.js";
import empRoutes from "./emp.js";
import userRouter from "./hrms/userRoute.js";
import employeeRouter from "./hrms/employeeRoutes.js";
import leaveRouter from "./hrms/leaveRoutes.js";
import messageRouter from "./hrms/messageRoutes.js";
import groupRouter from "./hrms/groupRoutes.js"

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/emp", empRoutes);
router.use("/users", userRouter);
router.use("/employee", employeeRouter);
router.use("/leave", leaveRouter);

router.use("/message", messageRouter);
router.use("/group", groupRouter);

export default router;

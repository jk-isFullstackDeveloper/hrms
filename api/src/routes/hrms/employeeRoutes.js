import express from 'express';
const router = express.Router();
import { createEmployee, getAllEmployees } from '../../controller/employeeController.js';
router.post('/create', createEmployee);
router.get("/list", getAllEmployees);
export default router;
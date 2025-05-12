import express from 'express';
const router = express.Router();
import jwt from "jsonwebtoken";
import {getAllEmployees,getEmployeeByEmail,getEmployeeTaskById,getEmployeeById,deleteEmployee,addOrEditEmployee} from '../services/emp.services.js';

router.get('/login/:email/:password', async (req, res) => {
    const employee = await getEmployeeByEmail(req.params.email)
    if (!employee) { return res.status(404).json({ message: 'no record with given email : ' + req.params.email }) }
    if (employee.password !== req.params.password) { return res.status(401).json({ message: "Wrong password !." }) }
    const token = jwt.sign({ id: employee.id, email: employee.email }, "z1Tech", { expiresIn: "24hr" });
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "Strict", });
    return res.status(200).json({ token, employee });
});

router.get('/',   async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit
    const employees = await getAllEmployees(page, limit, offset);
    res.send(employees);
});

router.get('/:id/task', async (req, res) => {
    const employees = await getEmployeeTaskById(req.params.id);
    res.send(employees);
});

router.get('/:id', async (req, res) => {
    const employee = await getEmployeeById(req.params.id)
    if (employee == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(employee)
});

router.delete('/:id', async (req, res) => {
    const affectedRows = await deleteEmployee(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('deleted successfully.')
});

router.post('/', async (req, res) => {
    await addOrEditEmployee(req.body)
    res.status(201).send('created successfully.')
});

router.put('/:id', async (req, res) => {
    const affectedRows = await addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('updated successfully.')
});

export default router;
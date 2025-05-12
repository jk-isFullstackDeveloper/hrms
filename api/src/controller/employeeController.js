import bcrypt from 'bcryptjs';
import Employees from '../models/Employee.js';
import User from '../models/User.js';

// Create a new employee
export const createEmployee = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash('123456', 10);
        const user = await User.create({ email: req?.body?.contact?.email, password: hashedPassword, });
        const employee = new Employees({ ...req.body, user: user._id });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Failed to create employee', error });
    }
};


// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employees.find().sort({ createdAt: -1 })
            .populate('user')
            .populate('manager')
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees', error });
    }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employees.findById(req.params.id)
            .populate('user')
            .populate('manager')
            .populate('salary');
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employee', error });
    }
};

// Update employee
export const updateEmployee = async (req, res) => {
    try {
        const updated = await Employees.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update employee', error });
    }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employees.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete employee', error });
    }
};

import Salary from '../models/Salary.js';

export const getSalaries = async (req, res) => {
    const salaries = await Salary.find().populate('employeeId');
    res.json(salaries);
};

export const createSalary = async (req, res) => {
    const salary = await Salary.create(req.body);
    res.status(201).json(salary);
};
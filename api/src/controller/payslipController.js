import Payslip from '../models/Payslip.js';

export const getPayslips = async (req, res) => {
    const payslips = await Payslip.find().populate('employeeId salaryId');
    res.json(payslips);
};

export const createPayslip = async (req, res) => {
    const payslip = await Payslip.create(req.body);
    res.status(201).json(payslip);
};

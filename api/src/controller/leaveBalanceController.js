import LeaveBalance from '../models/LeaveBalance.js';

export const getLeaveBalances = async (req, res) => {
    const balances = await LeaveBalance.find().populate('employeeId');
    res.json(balances);
};

export const updateLeaveBalance = async (req, res) => {
    const updated = await LeaveBalance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
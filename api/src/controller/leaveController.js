import LeaveType from '../models/LeaveType.js';
import LeaveAllocation from "../models/LeaveAllocation.js";
import LeaveRequest from "../models/LeaveRequest.js";

export const getLeveType = async (req, res) => {
    try {
        const leaves = await LeaveType.find();
        res.status(200).json({ message: "success", data: leaves });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
};

export const createLeveType = async (req, res) => {
    try {
        const leave = await LeaveType.create(req.body);
        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
};

export const allocateLeave = async (req, res) => {
    try {
        const leave = await LeaveAllocation.create(req.body);
        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const allocateLeaveList = async (req, res) => {
    try {
        const leave = await LeaveAllocation.find().populate('employee').populate('leaveType');
        res.status(200).json({ message: "success", data: leave });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}





export const leaveRequestList = async (req, res) => {
    try {
        const leave = await LeaveRequest.find()
            .populate('employee')
            .populate('leaveType')
            .populate('approvedBy').limit('5');
        res.status(200).json({ message: "success", data: leave });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const leaveRequestCreate = async (req, res) => {
    try {
        const leave = await LeaveRequest.create(req.body);
        res.status(200).json({ message: "success", data: leave });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
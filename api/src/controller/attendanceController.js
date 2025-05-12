import Attendance from '../models/Attendance.js';

export const getAttendance = async (req, res) => {
    const data = await Attendance.find().populate('employeeId');
    res.json(data);
};

export const createAttendance = async (req, res) => {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
};
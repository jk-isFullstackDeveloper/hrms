import AuditLog from '../models/AuditLog.js';

export const getLogs = async (req, res) => {
    const logs = await AuditLog.find().populate('userId');
    res.json(logs);
};
import Permission from '../models/Permission.js';

export const getPermissions = async (req, res) => {
    const permissions = await Permission.find();
    res.json(permissions);
};

export const updatePermission = async (req, res) => {
    const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(permission);
};

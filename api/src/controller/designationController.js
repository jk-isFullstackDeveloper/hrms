import Designation from '../models/Designation.js';

export const getDesignations = async (req, res) => {
    const designations = await Designation.find().populate('departmentId');
    res.json(designations);
};

export const createDesignation = async (req, res) => {
    const designation = await Designation.create(req.body);
    res.status(201).json(designation);
};
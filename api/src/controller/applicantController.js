import Applicant from '../models/Applicant.js';

export const getApplicants = async (req, res) => {
    const applicants = await Applicant.find().populate('jobId');
    res.json(applicants);
};

export const createApplicant = async (req, res) => {
    const applicant = await Applicant.create(req.body);
    res.status(201).json(applicant);
};
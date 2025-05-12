import Interview from '../models/Interview.js';

export const getInterviews = async (req, res) => {
    const interviews = await Interview.find().populate('applicantId jobId interviewerId');
    res.json(interviews);
};

export const scheduleInterview = async (req, res) => {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
};
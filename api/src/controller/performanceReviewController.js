import PerformanceReview from '../models/PerformanceReview.js';

export const getReviews = async (req, res) => {
    const reviews = await PerformanceReview.find().populate('employeeId reviewerId');
    res.json(reviews);
};

export const createReview = async (req, res) => {
    const review = await PerformanceReview.create(req.body);
    res.status(201).json(review);
};
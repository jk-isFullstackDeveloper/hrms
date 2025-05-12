import mongoose from 'mongoose';
const PerformanceReviewSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    reviewDate: Date,
    period: {
        from: Date,
        to: Date
    },
    ratings: {
        productivity: Number,
        punctuality: Number,
        communication: Number,
        teamwork: Number
    },
    comments: String
}, { timestamps: true });
export default mongoose.model('PerformanceReviews', PerformanceReviewSchema);

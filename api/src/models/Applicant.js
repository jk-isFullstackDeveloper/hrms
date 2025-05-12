import mongoose from 'mongoose';
const ApplicantSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' },
    name: String,
    email: String,
    phone: String,
    resumeUrl: String,
    stage: String,
    notes: String,
    appliedAt: Date
});
export default mongoose.model('Applicants', ApplicantSchema);
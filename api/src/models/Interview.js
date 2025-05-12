import mongoose from 'mongoose';
const InterviewSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicants' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' },
    interviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    scheduledAt: Date,
    mode: String,
    status: String,
    feedback: String
  });
  export default mongoose.model('Interviews', InterviewSchema);
  
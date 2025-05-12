import mongoose from 'mongoose';
const JobSchema = new mongoose.Schema({
    title: String,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Departments' },
    description: String,
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    openings: Number,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    postedAt: Date
  });
export default mongoose.model('Jobs', JobSchema);
  
import mongoose from 'mongoose';

const LeaveTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g. Sick Leave, Casual Leave
    description: { type: String },
    defaultDays: { type: Number, default: 0 }, // default allocated days
    isPaid: { type: Boolean, default: true },
});

export default mongoose.model('LeaveType', LeaveTypeSchema);
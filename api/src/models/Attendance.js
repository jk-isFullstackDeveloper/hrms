import mongoose from 'mongoose';
const AttendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    date: Date,
    clockIn: Date,
    clockOut: Date,
    status: String,
    workingHours: Number
  }, { timestamps: true });
export default mongoose.model('Attendances', AttendanceSchema);
  
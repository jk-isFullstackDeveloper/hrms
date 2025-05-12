import mongoose from 'mongoose';


const LeaveAllocationSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  leaveType: { type: mongoose.Schema.Types.ObjectId, ref: "LeaveType", required: true },
  year: { type: Number, required: true },
  totalAllocated: { type: Number, required: true },
  used: { type: Number, default: 0 },
  carriedForward: { type: Number, default: 0 },
});

export default mongoose.model('LeaveAllocation', LeaveAllocationSchema);

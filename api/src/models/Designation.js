import mongoose from 'mongoose';
const DesignationSchema = new mongoose.Schema({
    title: String,
    level: String,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Departments' }
  }, { timestamps: true });
  export default mongoose.model('Designations', DesignationSchema);
  
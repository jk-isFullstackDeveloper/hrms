import mongoose from 'mongoose';
const DepartmentSchema = new mongoose.Schema({
    name: String,
    description: String
}, { timestamps: true });
export default mongoose.model('Departments', DepartmentSchema);
import mongoose from 'mongoose';
const SalarySchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    basic: Number,
    hra: Number,
    allowances: Number,
    deductions: Number,
    tax: Number,
    effectiveFrom: Date
  }, { timestamps: true });
export default mongoose.model('Salarys', SalarySchema);
  
import mongoose from 'mongoose';
const PayslipSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
    salaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salarys' },
    month: String,
    year: Number,
    totalEarnings: Number,
    totalDeductions: Number,
    netPay: Number,
    generatedAt: Date,
    pdfUrl: String
});
export default mongoose.model('Payslips', PayslipSchema);
import mongoose from 'mongoose';
const EmployeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  fullName: String,
  employeeCode: String,
  gender: String,
  dob: Date,
  contact: {
    email: String,
    phone: String,
    address: String
  },
  personalInfo: {
    passportNo: String,
    passportExpDate: String,
    dob: String,
    maritalStatus: String
  },
  bankInfo: {
    acNo: String,
    bankName: String,
    panNo: String,
    ifscCode: String
  },
  skills: [{ type: String }],
  experince: [{ type: Object }],
  profile: { type: String },
  joiningDate: Date,
  department: String,
  designation: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees', default: null },
  salary: { type: mongoose.Schema.Types.ObjectId, ref: 'Salarys', default: null },
  documents: [{
    type: { type: String },
    url: String,
    uploadedAt: Date
  }],
  status: { type: String, enum: ['active', 'resigned', 'terminated'], default: 'active' }
}, { timestamps: true });
EmployeeSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastEmployee = await this.constructor.findOne().sort({ createdAt: -1 });

    let nextCode = 1;
    if (lastEmployee && lastEmployee.employeeCode) {
      const lastCode = parseInt(lastEmployee.employeeCode.replace('EMP', ''));
      nextCode = lastCode + 1;
    }

    this.employeeCode = `EMP${nextCode.toString().padStart(3, '0')}`;
  }
  next();
});
export default mongoose.model('Employees', EmployeeSchema);
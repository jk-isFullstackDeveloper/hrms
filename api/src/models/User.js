import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'hr', 'manager', 'employee'], default: 'employee' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });
export default mongoose.model('Users', UserSchema);

import mongoose from 'mongoose';
const SettingsSchema = new mongoose.Schema({
    companyName: String,
    logoUrl: String,
    emailConfig: {
        smtpHost: String,
        smtpPort: Number,
        email: String,
        password: String
    },
    leavePolicies: {
        casual: Number,
        sick: Number,
        earned: Number
    }
}, { timestamps: true });
export default mongoose.model('Settings', SettingsSchema);
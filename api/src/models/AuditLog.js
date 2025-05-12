
import mongoose from 'mongoose';
const AuditLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    action: String,
    module: String,
    recordId: mongoose.Schema.Types.ObjectId,
    timestamp: Date,
    oldData: mongoose.Schema.Types.Mixed,
    newData: mongoose.Schema.Types.Mixed
});
export default mongoose.model('AuditLogs', AuditLogSchema);
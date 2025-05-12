import mongoose from 'mongoose';
const PermissionSchema = new mongoose.Schema({
    role: String,
    module: String,
    canView: Boolean,
    canEdit: Boolean,
    canCreate: Boolean,
    canDelete: Boolean
  });
 export default mongoose.model('Permissions', PermissionSchema);
  
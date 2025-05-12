import mongoose from 'mongoose';
const groupChatSchema = new mongoose.Schema({
    name: String,
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
});

export default mongoose.model("GroupChats", groupChatSchema);

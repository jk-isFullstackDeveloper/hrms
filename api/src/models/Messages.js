import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "GroupChats", default: null },
    content: String,
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Messages", messageSchema);

import Messages from "../models/Messages.js";

export const getPrivateMessages = async (req, res) => {
    const { user1, user2 } = req.params;
    const messages = await Messages.find({ $or: [{ senderId: user1, receiverId: user2 }, { senderId: user2, receiverId: user1 },] }).sort("timestamp")
    res.json({ data: messages });
};

export const getGroupMessages = async (req, res) => {
    const { groupId } = req.params;
    const messages = await Messages.find({ groupId }).sort("timestamp")
    res.json({ data: messages });
};

export const createMessage = async (payload) => {
    const data = await Messages.create(payload);
    return data;
}

export const getUnreadCount = async (req, res) => {
    const { receiverId, senderId } = req.params;
    const count = await Messages.countDocuments({
        receiverId,
        senderId,
        readBy: { $ne: receiverId }
    });
    res.json({ data: count });
};

export const getUnreadGroupCount = async (req, res) => {
    const { groupId, userId } = req.params;
    const count = await Messages.countDocuments({
        groupId,
        readBy: { $ne: userId }
    });
    res.json({ data: count });
};

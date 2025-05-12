import GroupChat from "../models/GroupChat.js";

export const createGroup = async (req, res) => {
    const { name = null, members = [], admin = null } = req.body;
    const group = await GroupChat.create({ name, admin, members: [req.user._id, ...members] });
    res.json({ data: group });
};

export const getGroup = async (req, res) => {
    const { name, members } = req.body;
    const group = await GroupChat.find().populate("members");
    res.json({ data: group });
};

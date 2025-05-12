import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email = null, password = null } = req.body;
    if (!email || !password) { return res.status(400).json({ error: 'Email and password are required' }); }
    const user = await User.findOne({ email });
    if (!user) { return res.status(404).json({ error: 'User not found' }); }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { return res.status(401).json({ error: 'Invalid credentials' }); }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "Strict", });
    res.status(200).json({ message: 'Login successful', data: user, token, });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    const result = [...users];

    result.sort((a, b) => (a.type === "group" ? -1 : 1));

    res.json({ message: "Success", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    if (!email || !password) { return res.status(400).json({ error: 'Email and password are required' }); }
    const existingUser = await User.findOne({ email });
    if (existingUser) { return res.status(409).json({ error: 'User already exists' }); }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, ...rest });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "Strict", });
    res.status(201).json({ message: 'Signup successful', data: user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

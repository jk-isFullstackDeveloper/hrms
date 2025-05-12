import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const verifyAuth = async (req, res, next) => {
    try {


        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ message: "Token Error!" });
    }
};

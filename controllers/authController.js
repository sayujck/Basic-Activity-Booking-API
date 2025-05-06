import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// registr
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(406).json({
                message: "User Already Exist.. Please Login!",
                success: false,
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                name, email, phone, password: hashedPassword,
            });
            await newUser.save();
            res.status(200).json({
                newUser,
                message: "Successfully Registered",
                success: true,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Some error occurred!",
            success: false,
        });
    }
};

// login
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.json({
                success: false,
                message: 'Fill form completely'
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordValid) {
                res.json({
                    success: false,
                    message: 'Invalid Password'
                })
            }

            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 60 * 1000,
            })
            return res.status(200).json({
                message: 'Login Successfull',
                success: true,
                userId: existingUser._id,
                token,
            })
        }
        else {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

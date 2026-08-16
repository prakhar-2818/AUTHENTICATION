const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();


// ========================================
// REGISTER
// ========================================

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Account already exists. Please login."
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = new User({
            name: name.trim(),
            email: cleanEmail,
            password: hashedPassword
        });

        await user.save();

        console.log("Registered:", cleanEmail);

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ========================================
// LOGIN
// ========================================

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: cleanEmail
        });

        if (!user) {
            return res.status(404).json({
                message:
                    "Account not found. Please create an account first."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        console.log("Login:", cleanEmail);

        res.status(200).json({
            message: "Login successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ========================================
// SEND OTP
// ========================================

router.post("/send-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: cleanEmail
        });

        if (!user) {
            return res.status(404).json({
                message:
                    "No account found. Please create an account first."
            });
        }

        user.otp = otp;
        user.otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await user.save();

        res.json({
            message: "OTP stored successfully"
        });

    } catch (error) {
        console.log("SEND OTP ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// ========================================
// VERIFY OTP
// ========================================

router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: cleanEmail
        });

        if (!user) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        if (!user.otp) {
            return res.status(400).json({
                message:
                    "Please request an OTP first"
            });
        }

        if (
            !user.otpExpiry ||
            new Date() > user.otpExpiry
        ) {
            return res.status(400).json({
                message:
                    "OTP has expired. Please request a new OTP."
            });
        }

        if (user.otp !== otp.toString()) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        console.log(
            "OTP verified:",
            cleanEmail
        );

        res.status(200).json({
            message:
                "OTP verified successfully"
        });

    } catch (error) {
        console.log("VERIFY OTP ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ========================================
// RESET PASSWORD
// ========================================

router.post("/reset-password", async (req, res) => {
    try {
        const {
            email,
            otp,
            newPassword
        } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters"
            });
        }

        const cleanEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: cleanEmail
        });

        if (!user) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        if (!user.otp) {
            return res.status(400).json({
                message:
                    "Please request an OTP first"
            });
        }

        if (
            !user.otpExpiry ||
            new Date() > user.otpExpiry
        ) {
            return res.status(400).json({
                message:
                    "OTP has expired. Please request a new OTP."
            });
        }

        if (user.otp !== otp.toString()) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // Hash new password
        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password = hashedPassword;

        // Remove used OTP
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        console.log(
            "Password reset:",
            cleanEmail
        );

        res.status(200).json({
            message:
                "Password reset successfully"
        });

    } catch (error) {
        console.log(
            "RESET PASSWORD ERROR:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;
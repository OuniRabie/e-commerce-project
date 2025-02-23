const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Register a new user
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, address, phone } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({ firstName, lastName, email, password, address, phone });
    await user.save();

    // Generate verification token
    const token = user.generateAuthToken();
    // app name : E-commerce-project
    // app password: ffwh vaal zsrx hpex
    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Click the link to verify your email: http://localhost:5000/api/users/verify/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(201).json({ message: "Verification email sent" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

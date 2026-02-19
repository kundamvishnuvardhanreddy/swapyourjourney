const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TEMP password reset codes (for demo, store in DB for production)
const resetCodes = {};

// Signup - Register new user
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, phone, role });
    await user.save();
    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login - Authenticate user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Forgot Password - Generate code and show on screen (NO EMAIL)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password requested for:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Email not registered:", email);
      return res.status(400).json({ msg: "Email not registered" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    resetCodes[email] = code;

    console.log("Reset code generated:", code);

    // SHOW CODE ON SCREEN INSTEAD OF EMAIL
    res.json({ msg: `Your reset code is: ${code}` });
  } catch (err) {
    console.log("Error in forgotPassword:", err);
    res.status(500).json({ msg: err.message });
  }
};

// Reset Password - Check code and update password
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    if (!resetCodes[email] || resetCodes[email] !== code)
      return res.status(400).json({ msg: "Invalid code" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email not registered" });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    delete resetCodes[email];
    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
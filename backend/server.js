require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// ==========================
// CORS Configuration
// ==========================

const allowedOrigins = [
  process.env.FRONTEND_URL,   // Vercel frontend
  "http://localhost:3000"     // Local development
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// ==========================
// MongoDB Connection
// ==========================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ==========================
// Routes
// ==========================

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// ==========================
// Health Check Route
// ==========================

app.get('/', (req, res) => {
  res.json({ message: "Swap Your Journey API is running 🚀" });
});

// ==========================
// Error Handler
// ==========================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong!" });
});

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

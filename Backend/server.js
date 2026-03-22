require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./Config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();


// Routes
const authRoutes = require('./routes/auth');
const selfServiceRoutes = require('./routes/selfService');
const paymentRoutes = require('./routes/payment');
const aiRoutes = require('./routes/ai');
app.use('/api/auth', authRoutes);
app.use('/api/selfservice', selfServiceRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('UIMS Backend API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
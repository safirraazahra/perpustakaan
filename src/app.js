const express = require('express');
const cors = require('cors');
require('dotenv').config({ override: true });

const loanRoutes = require('./routes/loanRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Root endpoint ───────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Selamat datang di API Perpustakaan 📚',
    version: '1.0.0',
    endpoints: {
      loans: '/api/loans',
    },
    docs: 'https://github.com/safirraazahra/perpustakaan#readme',
  });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/loans', loanRoutes);

// ─── Error Handlers ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;

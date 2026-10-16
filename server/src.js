require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const db = require('./db');

// Import Rute
const authRoutes = require('./routes/authRoutes');
const childRoutes = require('./routes/childRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('ubah_ini')) {
  console.warn('PERINGATAN: ubah JWT_SECRET pada file .env sebelum digunakan.');
}

// 1. Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());

// Rate Limiter
app.use('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 30,
  standardHeaders: true, 
  legacyHeaders: false,
  message: { message: 'Terlalu banyak percobaan login. Coba lagi beberapa menit.' }
}));

// 2. Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

// 3. DAFTARKAN SEMUA RUTE API DI SINI (Sebelum 404 & app.listen)
app.use('/api/auth', authRoutes);
app.use('/api/anak', childRoutes); // <--- PEMINDAHAN: Wajib ditaruh di sini!

// 4. Middleware Handler 404 (Harus di bawah semua Rute API)
app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan.' }));

// 5. Middleware Handler Error Server (500)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Terjadi kesalahan server.' });
});

// 6. Jalankan Server
app.listen(PORT, () => console.log(`Daycare API berjalan di http://localhost:${PORT}`));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const publicUser = (u) => ({
  id: u.id,
  nama_pengguna: u.nama_pengguna,
  email: u.email,
  nama_lengkap: u.nama_lengkap,
  nomor_telepon: u.nomor_telepon,
  peran: u.peran,
  role: u.peran, // Ditambahkan agar aman dibaca frontend sebagai role
  foto_profil_url: u.foto_profil_url || null
});

function setSession(res, user) {
  const token = jwt.sign(
    { 
      id: user.id, 
      nama_lengkap: user.nama_lengkap, 
      role: user.peran,   // Menggunakan nilai dari kolom 'peran'
      peran: user.peran   // Menggunakan nilai dari kolom 'peran'
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
  );
  
  res.cookie('daycare_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000,
    path: '/'
  });
}

exports.login = async (req, res) => {
  try {
    const identifier = String(req.body.identifier || '').trim();
    const password = String(req.body.password || '');
    const role = String(req.body.role || '').trim();
    
    if (!identifier || !password || !['admin', 'staf', 'orangtua'].includes(role)) {
      return res.status(400).json({ message: 'Email/username, password, dan peran wajib diisi.' });
    }

    // Pastikan mengambil kolom 'peran' dari tabel pengguna
    const [rows] = await db.execute(
      'SELECT id, nama_pengguna, email, kata_sandi, nama_lengkap, nomor_telepon, peran, foto_profil_url FROM pengguna WHERE email = ? OR nama_pengguna = ? LIMIT 1',
      [identifier, identifier]
    );
    
    if (!rows.length) return res.status(401).json({ message: 'Email/username atau password salah.' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.kata_sandi);
    if (!match) return res.status(401).json({ message: 'Email/username atau password salah.' });
    
    if (user.peran !== role) {
      return res.status(403).json({ message: 'Peran akun tidak sesuai dengan pilihan. Silakan pilih peran yang benar.' });
    }

    setSession(res, user);
    return res.json({ message: 'Login berhasil.', user: publicUser(user) });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Terjadi kesalahan server. Periksa koneksi database.' });
  }
};

exports.me = async (req, res) => {
  try {
    // Ambil kolom 'peran' dari tabel pengguna
    const [rows] = await db.query(
      'SELECT id, nama_lengkap, email, nama_pengguna, nomor_telepon, peran, foto_profil_url FROM pengguna WHERE id = ?', 
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const userData = rows[0];

    // Petakan 'peran' ke 'role' agar sinkron dengan frontend
    res.json({ 
      user: {
        ...userData,
        role: userData.peran,   // Diambil dari kolom 'peran' database
        peran: userData.peran   // Diambil dari kolom 'peran' database
      } 
    });
  } catch (err) {
    console.error('Me error:', err.message);
    res.status(500).json({ message: 'Gagal mengambil data user.' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('daycare_token', {
    httpOnly: true, sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', path: '/'
  });
  res.json({ message: 'Anda berhasil logout.' });
};

exports.register = async (req, res) => {
  try {
    const nama_lengkap = String(req.body.nama_lengkap || '').trim();
    const nama_pengguna = String(req.body.nama_pengguna || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const nomor_telepon = String(req.body.nomor_telepon || '').trim();
    const password = String(req.body.password || '');

    if (!nama_lengkap || !nama_pengguna || !email || !nomor_telepon || password.length < 8) {
      return res.status(400).json({ message: 'Lengkapi semua kolom. Password minimal 8 karakter.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Format email tidak valid.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO pengguna (nama_pengguna, email, kata_sandi, nama_lengkap, nomor_telepon, peran) VALUES (?, ?, ?, ?, ?, ?)',
      [nama_pengguna, email, hash, nama_lengkap, nomor_telepon, 'orangtua']
    );
    res.status(201).json({ message: 'Pendaftaran berhasil. Silakan login sebagai Orang Tua.', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email atau username sudah digunakan.' });
    }
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Pendaftaran gagal. Periksa koneksi database.' });
  }
<<<<<<< HEAD
};

// update backend untuk PR
=======
};
>>>>>>> origin/fitur-frontend


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Data pengguna yang boleh dikirim ke frontend
const publicUser = (u) => ({
  id: u.id,
  nama_pengguna: u.nama_pengguna,
  email: u.email,
  nama_lengkap: u.nama_lengkap,
  nomor_telepon: u.nomor_telepon,
  peran: u.peran,
  role: u.peran,
  foto_profil_url: u.foto_profil_url || null
});

// Membuat session login berdasarkan role dari database
function setSession(res, user) {
  const token = jwt.sign(
    {
      id: user.id,
      nama_lengkap: user.nama_lengkap,
      role: user.peran,
      peran: user.peran
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.cookie('daycare_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000,
    path: '/'
  });
}

// ======================================
// LOGIN TANPA PILIHAN ROLE
// ======================================
exports.login = async (req, res) => {
  try {
    const identifier = String(req.body.identifier || '').trim();
    const password = String(req.body.password || '');

    // Tidak lagi meminta role dari frontend
    if (!identifier || !password) {
      return res.status(400).json({
        message: 'Email/username dan password wajib diisi.'
      });
    }

    // Cari pengguna berdasarkan email atau username
    const [rows] = await db.execute(
      `SELECT
        id,
        nama_pengguna,
        email,
        kata_sandi,
        nama_lengkap,
        nomor_telepon,
        peran,
        foto_profil_url
       FROM pengguna
       WHERE email = ? OR nama_pengguna = ?
       LIMIT 1`,
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: 'Email/username atau password salah.'
      });
    }

    const user = rows[0];

    // Verifikasi password dengan bcrypt
    const passwordMatch = await bcrypt.compare(
      password,
      user.kata_sandi
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Email/username atau password salah.'
      });
    }

    // Validasi role dari database
    if (!['admin', 'staf', 'orangtua'].includes(user.peran)) {
      return res.status(403).json({
        message: 'Role akun tidak valid. Hubungi administrator.'
      });
    }

    // Buat session berdasarkan role database
    setSession(res, user);

    return res.status(200).json({
      message: 'Login berhasil.',
      user: publicUser(user)
    });

  } catch (err) {
    console.error('Login error:', err);

    return res.status(500).json({
      message: 'Terjadi kesalahan server. Periksa koneksi database.'
    });
  }
};

// ======================================
// CEK SESSION / USER LOGIN
// ======================================
exports.me = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT
        id,
        nama_lengkap,
        email,
        nama_pengguna,
        nomor_telepon,
        peran,
        foto_profil_url
       FROM pengguna
       WHERE id = ?
       LIMIT 1`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Pengguna tidak ditemukan.'
      });
    }

    return res.status(200).json({
      user: publicUser(rows[0])
    });

  } catch (err) {
    console.error('Me error:', err);

    return res.status(500).json({
      message: 'Gagal mengambil data pengguna.'
    });
  }
};

// ======================================
// LOGOUT
// ======================================
exports.logout = (req, res) => {
  res.clearCookie('daycare_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });

  return res.status(200).json({
    message: 'Anda berhasil logout.'
  });
};

// ======================================
// REGISTER KHUSUS ORANG TUA
// ======================================
exports.register = async (req, res) => {
  try {
    const nama_lengkap = String(req.body.nama_lengkap || '').trim();
    const nama_pengguna = String(req.body.nama_pengguna || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const nomor_telepon = String(req.body.nomor_telepon || '').trim();
    const password = String(req.body.password || '');

    if (
      !nama_lengkap ||
      !nama_pengguna ||
      !email ||
      !nomor_telepon ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: 'Lengkapi semua kolom. Password minimal 8 karakter.'
      });
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Format email tidak valid.'
      });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Registrasi selalu sebagai orangtua
    const [result] = await db.execute(
      `INSERT INTO pengguna
        (nama_pengguna, email, kata_sandi, nama_lengkap,
         nomor_telepon, peran)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nama_pengguna,
        email,
        hash,
        nama_lengkap,
        nomor_telepon,
        'orangtua'
      ]
    );

    return res.status(201).json({
      message: 'Pendaftaran berhasil. Silakan login.',
      id: result.insertId
    });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'Email atau username sudah digunakan.'
      });
    }
<<<<<<< Updated upstream
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Pendaftaran gagal. Periksa koneksi database.' });
  }
};

=======

    console.error('Register error:', err);

    return res.status(500).json({
      message: 'Pendaftaran gagal. Periksa koneksi database.'
    });
  }
};
>>>>>>> Stashed changes

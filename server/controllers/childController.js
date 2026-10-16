const db = require('../db'); // Sesuaikan jalur file koneksi database Anda

// 1. Ambil Data Anak
exports.getAnak = async (req, res) => {
  try {
    let query = `
      SELECT anak.*, pengguna.nama_lengkap AS nama_orangtua 
      FROM anak 
      LEFT JOIN pengguna ON anak.orangtua_id = pengguna.id
    `;
    let params = [];

    // Jika pengguna yang login adalah orang tua, hanya ambil anak miliknya
    if (req.user.peran === 'orangtua') {
      query += ` WHERE anak.orangtua_id = ?`;
      params.push(req.user.id);
    }

    const [rows] = await db.execute(query, params);
    return res.json({ data: rows });
  } catch (err) {
    console.error('Get Anak Error:', err.message);
    return res.status(500).json({ message: 'Gagal memuat data anak.' });
  }
};

// 2. Ambil Daftar Pengguna Ber-peran 'orangtua' untuk Dropdown
exports.getOrangTuaList = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, nama_lengkap, email FROM pengguna WHERE peran = 'orangtua' ORDER BY nama_lengkap ASC"
    );
    return res.json({ data: rows });
  } catch (err) {
    console.error('Get OrangTua List Error:', err.message);
    return res.status(500).json({ message: 'Gagal memuat daftar orang tua.' });
  }
};

// 3. Tambah Data Anak Baru
exports.tambahAnak = async (req, res) => {
  try {
    const { orangtua_id, nama_lengkap, nama_panggilan, jenis_kelamin, tanggal_lahir, golongan_darah, catatan_khusus } = req.body;

    if (!orangtua_id || !nama_lengkap || !jenis_kelamin || !tanggal_lahir) {
      return res.status(400).json({ message: 'Lengkapi semua kolom wajib.' });
    }

    await db.execute(
      `INSERT INTO anak (orangtua_id, nama_lengkap, nama_panggilan, jenis_kelamin, tanggal_lahir, golongan_darah, catatan_khusus, is_aktif) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        orangtua_id,
        nama_lengkap,
        nama_panggilan || null,
        jenis_kelamin,
        tanggal_lahir,
        golongan_darah || 'TIDAK_DIKETAHUI',
        catatan_khusus || null
      ]
    );

    return res.status(201).json({ message: 'Data anak berhasil ditambahkan.' });
  } catch (err) {
    console.error('Tambah Anak Error:', err.message);
    return res.status(500).json({ message: 'Gagal menambah data anak.' });
  }
};

// 4. Update Data Anak
exports.updateAnak = async (req, res) => {
  try {
    const { id } = req.params;
    const { orangtua_id, nama_lengkap, nama_panggilan, jenis_kelamin, tanggal_lahir, golongan_darah, catatan_khusus } = req.body;

    if (!orangtua_id || !nama_lengkap || !jenis_kelamin || !tanggal_lahir) {
      return res.status(400).json({ message: 'Kolom wajib harus diisi.' });
    }

    await db.execute(
      `UPDATE anak SET orangtua_id = ?, nama_lengkap = ?, nama_panggilan = ?, jenis_kelamin = ?, tanggal_lahir = ?, golongan_darah = ?, catatan_khusus = ? WHERE id = ?`,
      [orangtua_id, nama_lengkap, nama_panggilan || null, jenis_kelamin, tanggal_lahir, golongan_darah || 'TIDAK_DIKETAHUI', catatan_khusus || null, id]
    );

    return res.json({ message: 'Data anak berhasil diperbarui.' });
  } catch (err) {
    console.error('Update Anak Error:', err.message);
    return res.status(500).json({ message: 'Gagal memperbarui data anak.' });
  }
};

// 5. Hapus Data Anak
exports.deleteAnak = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM anak WHERE id = ?', [id]);
    return res.json({ message: 'Data anak berhasil dihapus.' });
  } catch (err) {
    console.error('Delete Anak Error:', err.message);
    return res.status(500).json({ message: 'Gagal menghapus data anak.' });
  }
};

// Ambil statistik ringkasan dashboard
exports.getStats = async (req, res) => {
  try {
    // 1. Total anak asuh aktif
    const [[anakCount]] = await db.execute("SELECT COUNT(*) AS total FROM anak WHERE is_aktif = 1");
    
    // 2. Total orang tua terdaftar
    const [[ortuCount]] = await db.execute("SELECT COUNT(*) AS total FROM pengguna WHERE peran = 'orangtua'");

    // 3. Jika pengguna yang login adalah orang tua, hitung anak miliknya sendiri
    let myAnakCount = 0;
    if (req.user.peran === 'orangtua') {
      const [[myAnak]] = await db.execute("SELECT COUNT(*) AS total FROM anak WHERE orangtua_id = ? AND is_aktif = 1", [req.user.id]);
      myAnakCount = myAnak.total;
    }

    return res.json({
      totalAnak: anakCount.total || 0,
      totalOrangTua: ortuCount.total || 0,
      totalAnakSaya: myAnakCount
    });
  } catch (err) {
    console.error('Get Stats Error:', err.message);
    return res.status(500).json({ message: 'Gagal mengambil data statistik.' });
  }
};
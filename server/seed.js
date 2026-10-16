require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

async function upsertDemo({ username, email, password, name, phone, role }) {
  const hash = await bcrypt.hash(password, 10);
  const [rows] = await db.execute(
    'SELECT id FROM pengguna WHERE email = ? OR nama_pengguna = ? LIMIT 1', [email, username]
  );
  if (rows.length) {
    await db.execute(
      'UPDATE pengguna SET nama_pengguna=?, email=?, kata_sandi=?, nama_lengkap=?, nomor_telepon=?, peran=? WHERE id=?',
      [username, email, hash, name, phone, role, rows[0].id]
    );
  } else {
    await db.execute(
      'INSERT INTO pengguna (nama_pengguna,email,kata_sandi,nama_lengkap,nomor_telepon,peran) VALUES (?,?,?,?,?,?)',
      [username, email, hash, name, phone, role]
    );
  }
}
(async () => {
  try {
    await upsertDemo({ username:'admin_daycare', email:'admin@daycare.com', password:'Admin123!', name:'Administrator Utama', phone:'081234567890', role:'admin' });
    await upsertDemo({ username:'staf_budi', email:'budi@daycare.com', password:'Staf123!', name:'Budi Santoso (Pengasuh)', phone:'082345678901', role:'staf' });
    await upsertDemo({ username:'ortu_siti', email:'siti@gmail.com', password:'Ortu123!', name:'Siti Rahmawati', phone:'083456789012', role:'orangtua' });
    console.log('Akun demo siap. Ganti password sebelum deployment.');
  } catch (e) {
    console.error('Seed gagal:', e.message);
    process.exitCode = 1;
  } finally { await db.end(); }
})();
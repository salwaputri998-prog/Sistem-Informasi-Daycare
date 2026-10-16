const express = require('express');
const router = express.Router();
const controller = require('../controllers/childController');
const { authenticate, allowRoles } = require('../middleware/auth');

// Endpoint Ambil Data Anak
router.get('/', authenticate, controller.getAnak);

// Endpoint Khusus Ambil Daftar Orang Tua (Dropdown)
router.get('/orangtua-list', authenticate, allowRoles('admin', 'staf'), controller.getOrangTuaList);

// Endpoint Tambah Data Anak
router.post('/', authenticate, allowRoles('admin', 'staf'), controller.tambahAnak);

// RUTE BARU UNTUK EDIT & HAPUS (Khusus Admin & Staf)
router.put('/:id', authenticate, allowRoles('admin', 'staf'), controller.updateAnak);
router.delete('/:id', authenticate, allowRoles('admin', 'staf'), controller.deleteAnak);
// Ambil statistik ringkasan dashboard
router.get('/stats', authenticate, controller.getStats);
module.exports = router;
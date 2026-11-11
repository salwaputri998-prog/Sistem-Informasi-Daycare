import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { 
  Check, Copy, Upload, CreditCard, Star, User,
  Flower2, ArrowUpRight, ShieldCheck, Eye, EyeOff, Sun, LogOut, 
  Baby, Users, Sparkles, Mail, LockKeyhole, UserRound, Phone, Leaf,
  Home, Calendar, Smile, Clock, Bell, MapPin, ChevronDown, Plus, Search, AlertCircle, Heart, Edit3, Trash2, ClipboardCheck, 
  Receipt, ArrowRight, Shield, Activity, Award
} from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const roleLabels = { 
  orangtua: 'Orang Tua', 
  admin: 'Admin', 
  staf: 'Admin' 
};

function Brand() {
  return (
    <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span className="brand-icon" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Menggunakan logo gambar dari folder public/image/ */}
        <img 
          src="/image/icon.png" 
          alt="Logo Daycare Ceria" 
          style={{ width: '50px', height: '32px', objectFit: 'contain' }} 
          onError={(e) => {
            // Fallback otomatis jika nama file logo berbeda
            e.target.style.display = 'none';
          }}
        />
      </span>
      <span>daycare Ceria<span className="brand-dot">.</span></span>
    </div>
  );
}

function ArtPanel() {
  return (
    <section className="art-panel">
      <Brand />
      <div className="art-copy">
        <div className="eyebrow">TUMBUH BAHAGIA, BERSAMA KAMI <span>♥</span></div>
        <h1>Setiap hari adalah kesempatan untuk tumbuh.</h1>
        <p>Ruang aman, hangat, dan menyenangkan untuk si kecil<br className="desktop-break"/> belajar dan bermain.</p>
      </div>
      <Sun className="sun" size={36} strokeWidth={2.3}/>
      <div className="hill">
        <div className="toy teddy">🧸</div>
        <div className="toy flower">🌼</div>
        <div className="tiny-leaf"><Leaf size={20}/></div>
      </div>
    </section>
  );
}

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ identifier: false, password: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault(); 
    setError('');
    setFieldErrors({ identifier: false, password: false });
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ identifier, password })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server merespons bukan dalam format JSON.");
      }

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          setError('Login gagal. Periksa kembali email/username dan password Anda.');
          setFieldErrors({ identifier: true, password: true });
        } else {
          setError(data.message || 'Login gagal. Silakan coba kembali.');
        }
        return;
      }
      // Dashboard membaca role dari session dan menampilkan menu sesuai peran pengguna.
      navigate('/dashboard');
    } catch (err) {
      setError(err.message === 'Failed to fetch' 
        ? 'Server belum terhubung. Pastikan backend Node.js berjalan di port 3000.' 
        : err.message
      );
    } finally { 
      setLoading(false); 
    }
  }

  return (
    <main className="auth-layout">
      <ArtPanel />
      <section className="form-panel">
        <div className="form-wrap">
          <div className="mobile-brand"><Brand /></div>
          <div className="form-eyebrow">SISTEM INFORMASI DAYCARE</div>
          <h2>Selamat datang!</h2>
          <p className="subtitle">Masuk dengan email atau username dan password Anda</p>

          <form onSubmit={submit}>
            {error && <div className="error-message" role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 13px', marginBottom: 16, borderRadius: 9, background: '#fff0f0', border: '1px solid #ffd7d7', color: '#b42318', fontSize: 12, lineHeight: 1.45 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>}

            <label htmlFor="identifier">Email atau username</label>
            <div className="input-wrap" style={fieldErrors.identifier ? { border: '1.5px solid #e5484d', boxShadow: '0 0 0 1px rgba(229,72,77,0.08)' } : undefined}>
              <Mail size={17} color={fieldErrors.identifier ? '#d92d20' : undefined}/>
              <input 
                id="identifier" 
                value={identifier} 
                placeholder="nama@email.com" 
                autoComplete="username" 
                required 
                onChange={e => { setIdentifier(e.target.value); if (fieldErrors.identifier) setFieldErrors(v => ({ ...v, identifier: false })); }}
              />
            </div>
            {fieldErrors.identifier && <div style={{ color: '#d92d20', fontSize: 11, marginTop: 5, marginBottom: 12 }}>Akun tidak ditemukan</div>}

            <label htmlFor="password">Password</label>
            <div className="input-wrap" style={fieldErrors.password ? { border: '1.5px solid #e5484d', boxShadow: '0 0 0 1px rgba(229,72,77,0.08)' } : undefined}>
              <LockKeyhole size={17} color={fieldErrors.password ? '#d92d20' : undefined}/>
              <input 
                id="password" 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                placeholder="Minimal 8 karakter" 
                autoComplete="current-password" 
                required 
                minLength={8}
                onChange={e => { setPassword(e.target.value); if (fieldErrors.password) setFieldErrors(v => ({ ...v, password: false })); }}
              />
              <button 
                className="show-password" 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>

            {fieldErrors.password && <div style={{ color: '#d92d20', fontSize: 11, marginTop: 5, marginBottom: 12 }}>Password salah</div>}

            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? 'Memeriksa...' : 'Login'} {!loading && <ArrowUpRight size={18}/>}
            </button>
          </form>

          <div className="register-line">
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </div>
          <div className="privacy">
            <ShieldCheck size={16}/>
            <span>Data keluarga Anda dijaga dengan aman</span>
          </div>
        </div>
        <div className="form-decoration">
          <Sparkles size={15}/> Dibangun dengan kasih untuk tumbuh kembang si kecil
        </div>
      </section>
    </main>
  );
}

function Register() {
  const [form, setForm] = useState({
    nama_lengkap: '', 
    nama_pengguna: '', 
    email: '', 
    nomor_telepon: '', 
    password: ''
  });
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault(); 
    setError(''); 
    setSuccess(''); 
    setLoading(true);
    try {
      const r = await fetch('/api/auth/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form)
      });
      const contentType = r.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server merespons bukan dalam format JSON.");
      }
      const d = await r.json(); 
      if (!r.ok) throw new Error(d.message || 'Pendaftaran gagal.');
      setSuccess(d.message); 
      setTimeout(() => navigate('/login'), 1400);
    } catch(err) { 
      setError(err.message === 'Failed to fetch' ? 'Server belum terhubung.' : err.message); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-layout">
      <ArtPanel />
      <section className="form-panel register-panel">
        <div className="form-wrap">
          <div className="mobile-brand"><Brand /></div>
          <div className="form-eyebrow">GABUNG KELUARGA DAYCARE</div>
          <h2>Buat akun orang tua</h2>
          <p className="subtitle">Daftarkan akun Anda untuk memulai</p>

          <form onSubmit={submit} className="register-form">
            <label>Nama lengkap</label>
            <div className="input-wrap">
              <UserRound size={17}/>
              <input name="nama_lengkap" value={form.nama_lengkap} onChange={update} placeholder="Nama lengkap Anda" required/>
            </div>

            <label>Username</label>
            <div className="input-wrap">
              <UserRound size={17}/>
              <input name="nama_pengguna" value={form.nama_pengguna} onChange={update} placeholder="Pilih username" minLength={3} required/>
            </div>

            <label>Email</label>
            <div className="input-wrap">
              <Mail size={17}/>
              <input name="email" type="email" value={form.email} onChange={update} placeholder="nama@email.com" required/>
            </div>

            <label>Nomor telepon</label>
            <div className="input-wrap">
              <Phone size={17}/>
              <input name="nomor_telepon" value={form.nomor_telepon} onChange={update} placeholder="08xxxxxxxxxx" required/>
            </div>

            <label>Password (minimal 8 karakter)</label>
            <div className="input-wrap">
              <LockKeyhole size={17}/>
              <input name="password" type="password" value={form.password} onChange={update} minLength={8} placeholder="Buat password" required/>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button className="submit-button" disabled={loading}>
              {loading ? 'Mendaftarkan...' : 'Daftar akun'} <ArrowUpRight size={18}/>
            </button>
          </form>

          <div className="register-line">
            Sudah punya akun? <Link to="/login">Login di sini</Link>
          </div>
          <div className="privacy">
            <ShieldCheck size={16}/>
            <span>Pendaftaran hanya tersedia untuk peran orang tua</span>
          </div>
        </div>
      </section>
    </main>
  );
}
// ================= KOMPONEN TAB ANAK SAYA (ORANG TUA) =================
function AnakTab({ isAdminOrStaff, dataAnak, setDataAnak, user }) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    nama_lengkap: '',
    nama_panggilan: '',
    jenis_kelamin: 'Laki-laki',
    golongan_darah: 'O',
    tanggal_lahir: '',
    catatan_khusus: ''
  });

  // Filter khusus untuk role Orang Tua (hanya menampilkan anak milik orang tua yang sedang login atau data anak terdaftar)
  const myChildren = dataAnak.filter(item => {
    if (isAdminOrStaff) return true;
    if (item.orang_tua) {
      return item.orang_tua.toLowerCase().includes(user?.nama_lengkap?.toLowerCase() || '') ||
             user?.nama_lengkap?.toLowerCase().includes(item.orang_tua.toLowerCase());
    }
    return true; // Fallback jika data demo
  });

  const filteredAnak = myChildren.filter(item =>
    (item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(search.toLowerCase())) ||
    (item.nama_panggilan && item.nama_panggilan.toLowerCase().includes(search.toLowerCase()))
  );

  function handleOpenAdd() {
    setEditMode(false);
    setCurrentId(null);
    setForm({ 
      nama_lengkap: '', 
      nama_panggilan: '', 
      jenis_kelamin: 'Laki-laki', 
      golongan_darah: 'O', 
      tanggal_lahir: '', 
      catatan_khusus: '' 
    });
    setModalOpen(true);
  }

  function handleOpenEdit(item) {
    setEditMode(true);
    setCurrentId(item.id);
    setForm({
      nama_lengkap: item.nama_lengkap || '',
      nama_panggilan: item.nama_panggilan || '',
      jenis_kelamin: item.jenis_kelamin || 'Laki-laki',
      golongan_darah: item.golongan_darah || 'O',
      tanggal_lahir: item.tanggal_lahir ? item.tanggal_lahir.substring(0, 10) : '',
      catatan_khusus: item.catatan_khusus || ''
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editMode) {
      setDataAnak(prev => prev.map(item => item.id === currentId ? { 
        ...item, 
        ...form,
        orang_tua: item.orang_tua || user?.nama_lengkap || 'Orang Tua'
      } : item));
    } else {
      const newItem = {
        id: Date.now(),
        ...form,
        orang_tua: user?.nama_lengkap || 'Orang Tua'
      };
      setDataAnak(prev => [newItem, ...prev]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus data anak ini?')) return;
    setDataAnak(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Anak Saya
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
            Kelola profil si kecil untuk pendaftaran booking penitipan.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          style={{ 
            background: '#277e70', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '14px', 
            fontWeight: '600', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontSize: '15px',
            boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)'
          }}
        >
          <Plus size={20} strokeWidth={2.5} /> Tambah Anak
        </button>
      </div>

      {/* SEARCH BAR */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          background: '#fff', 
          padding: '14px 20px', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Cari nama anak..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', background: 'transparent', color: '#334155' }}
          />
        </div>
      </div>

      {/* GRID KARTU ANAK SAYA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredAnak.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            <Smile size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ margin: 0 }}>Belum ada data anak terdaftar. Klik <b>"Tambah Anak"</b> untuk menambahkan data si kecil.</p>
          </div>
        ) : (
          filteredAnak.map((item) => (
            <div 
              key={item.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                {/* HEADER KARTU */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                  <div style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', 
                    background: '#e6f4ea', 
                    color: '#137333', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold', 
                    fontSize: '20px',
                    flexShrink: 0 
                  }}>
                    {item.nama_lengkap ? item.nama_lengkap.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                      {item.nama_lengkap}
                    </h3>
                    <span style={{ fontSize: '13px', color: '#64748b', marginTop: '2px', display: 'block' }}>
                      Panggilan: {item.nama_panggilan || '-'}
                    </span>
                  </div>
                </div>

                {/* DETAIL INFORMASI */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={16} color="#64748b" />
                    <span>Tanggal Lahir: {item.tanggal_lahir ? item.tanggal_lahir.substring(0, 10) : '-'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Smile size={16} color="#64748b" />
                    <span>Kelamin: {item.jenis_kelamin || 'Laki-laki'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={16} color="#64748b" />
                    <span>Gol. Darah: {item.golongan_darah || '-'}</span>
                  </div>
                  {item.catatan_khusus && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px', background: '#fff1f2', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ffe4e6' }}>
                      <AlertCircle size={16} color="#e11d48" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '12px', color: '#be123c' }}>Catatan/Alergi: {item.catatan_khusus}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {/* TOMBOL AKSI */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    onClick={() => handleOpenEdit(item)}
                    style={{ 
                      background: '#dcfce7', 
                      color: '#16a34a', 
                      border: 'none', 
                      padding: '10px', 
                      borderRadius: '10px', 
                      fontWeight: '600', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px', 
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ 
                      background: '#fee2e2', 
                      color: '#ef4444', 
                      border: 'none', 
                      padding: '10px', 
                      borderRadius: '10px', 
                      fontWeight: '600', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px', 
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL TAMBAH / EDIT ANAK */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', width: '460px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 18px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
              {editMode ? 'Edit Data Anak' : 'Tambah Data Anak'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Lengkap Anak</label>
                <input 
                  type="text" 
                  value={form.nama_lengkap} 
                  onChange={e => setForm({ ...form, nama_lengkap: e.target.value })} 
                  placeholder="Contoh: Rima Azzahra Mahira"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Panggilan</label>
                <input 
                  type="text" 
                  value={form.nama_panggilan} 
                  onChange={e => setForm({ ...form, nama_panggilan: e.target.value })} 
                  placeholder="Contoh: Rima"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Jenis Kelamin</label>
                  <select 
                    value={form.jenis_kelamin} 
                    onChange={e => setForm({ ...form, jenis_kelamin: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', outline: 'none' }}
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Gol. Darah</label>
                  <select 
                    value={form.golongan_darah} 
                    onChange={e => setForm({ ...form, golongan_darah: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', outline: 'none' }}
                  >
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Tanggal Lahir</label>
                <input 
                  type="date" 
                  value={form.tanggal_lahir} 
                  onChange={e => setForm({ ...form, tanggal_lahir: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#fff' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Catatan Khusus / Alergi (Opsional)</label>
                <textarea 
                  rows={2}
                  value={form.catatan_khusus} 
                  onChange={e => setForm({ ...form, catatan_khusus: e.target.value })} 
                  placeholder="Contoh: Alergi kacang, riwayat asma"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', resize: 'vertical' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: '600' }}>
                  Batal
                </button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#277e70', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// ================= KOMPONEN KESEHATAN ANAK (ORANG TUA) =================
function KesehatanAnakSayaTab() {
  const [riwayatKesehatan] = useState([
    {
      id: 1,
      tanggal: '20 Okt 2026',
      berat: '32 kg',
      tinggi: '138 cm',
      suhu: '36,6 °C',
      catatan: 'Sehat, nafsu makan baik.'
    },
    {
      id: 2,
      tanggal: '20 Sep 2026',
      berat: '31,5 kg',
      tinggi: '137 cm',
      suhu: '36,5 °C',
      catatan: 'Batuk ringan, sudah membaik.'
    },
    {
      id: 3,
      tanggal: '21 Agu 2026',
      berat: '31 kg',
      tinggi: '136 cm',
      suhu: '36,7 °C',
      catatan: 'Kondisi prima.'
    },
    {
      id: 4,
      tanggal: '22 Jul 2026',
      berat: '30,5 kg',
      tinggi: '135 cm',
      suhu: '36,6 °C',
      catatan: 'Imunisasi booster dilakukan.'
    }
  ]);

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER UTAMA */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Kesehatan Anak 
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
          Pantau tumbuh kembang dan catatan kesehatan
        </p>
      </div>

      {/* KARTU RINGKASAN STATISTIK (3 KOTAK) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        
        {/* BERAT BADAN */}
        <div style={{ background: '#dcfce7', padding: '24px', borderRadius: '20px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#ffffff', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Heart size={26} />
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#14532d' }}>32 kg </div>
            <div style={{ fontSize: '13px', color: '#166534', fontWeight: '600' }}>Berat badan </div>
          </div>
        </div>

        {/* TINGGI BADAN */}
        <div style={{ background: '#f3e8ff', padding: '24px', borderRadius: '20px', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#ffffff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <UserRound size={26} />
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#581c87' }}>138 cm </div>
            <div style={{ fontSize: '13px', color: '#7e22ce', fontWeight: '600' }}>Tinggi badan </div>
          </div>
        </div>

        {/* SUHU TUBUH */}
        <div style={{ background: '#fef3c7', padding: '24px', borderRadius: '20px', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#ffffff', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Heart size={26} />
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#78350f' }}>36,6 °C </div>
            <div style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>Suhu tubuh </div>
          </div>
        </div>

      </div>

      {/* BAGIAN RIWAYAT PEMERIKSAAN */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Riwayat Pemeriksaan 
        </h3>
      </div>

      {/* TABEL RIWAYAT KESEHATAN */}
      <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 20px' }}>Tanggal Cek </th>
              <th style={{ padding: '16px 20px' }}>Berat Badan </th>
              <th style={{ padding: '16px 20px' }}>Tinggi Badan </th>
              <th style={{ padding: '16px 20px' }}>Suhu Tubuh </th>
              <th style={{ padding: '16px 20px' }}>Catatan Kesehatan </th>
            </tr>
          </thead>
          <tbody>
            {riwayatKesehatan.map((item, index) => {
              const isLast = index === riwayatKesehatan.length - 1;
              return (
                <tr key={item.id} style={{ borderBottom: isLast ? 'none' : '1px solid #f1f5f9', color: '#1e293b' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#0f172a' }}>{item.tanggal}</td>
                  <td style={{ padding: '16px 20px', color: '#475569' }}>{item.berat}</td>
                  <td style={{ padding: '16px 20px', color: '#475569' }}>{item.tinggi}</td>
                  <td style={{ padding: '16px 20px', color: '#475569' }}>{item.suhu}</td>
                  <td style={{ padding: '16px 20px', color: '#334155' }}>{item.catatan}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// ================= KOMPONEN TAB KESEHATAN ANAK =================
function KesehatanAnakTab({ isAdminOrStaff, dataAnak, listKesehatan, setListKesehatan, user }) {
  const availableChildren = isAdminOrStaff
    ? dataAnak
    : dataAnak.filter(anak => anak.orang_tua === user?.nama_lengkap || anak.id === 1);

  const [form, setForm] = useState({
    anak_id: availableChildren[0]?.id || '',
    tanggal: new Date().toISOString().substring(0, 10),
    bb: '',
    tb: '',
    suhu: '',
    catatan: ''
  });

  const filteredRiwayat = isAdminOrStaff
    ? listKesehatan
    : listKesehatan.filter(item => availableChildren.some(anak => anak.id === item.anak_id || anak.nama_lengkap.includes(item.nama_anak)));

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.anak_id) {
      alert('Silakan pilih anak terlebih dahulu.');
      return;
    }

    const selectedChildObj = dataAnak.find(a => String(a.id) === String(form.anak_id));
    const namaAnakSelected = selectedChildObj ? (selectedChildObj.nama_panggilan || selectedChildObj.nama_lengkap) : 'Anak';

    const dateObj = new Date(form.tanggal);
    const formattedDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    const newRecord = {
      id: Date.now(),
      anak_id: Number(form.anak_id),
      nama_anak: namaAnakSelected,
      tanggal: formattedDate,
      bb: form.bb,
      tb: form.tb,
      suhu: form.suhu,
      catatan: form.catatan || 'Sehat'
    };

    setListKesehatan(prev => [newRecord, ...prev]);

    setForm({
      anak_id: availableChildren[0]?.id || '',
      tanggal: new Date().toISOString().substring(0, 10),
      bb: '',
      tb: '',
      suhu: '',
      catatan: ''
    });

    alert('Catatan pemeriksaan kesehatan berhasil disimpan!');
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Kesehatan Anak
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
          Catat pemeriksaan dan pantau kesehatan anak.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: FORM CATAT PEMERIKSAAN */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
            Catat Pemeriksaan
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Anak
              </label>
              <div style={{ position: 'relative' }}>
                <select 
                  value={form.anak_id} 
                  onChange={e => setForm({ ...form, anak_id: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px 12px 42px', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '14px', 
                    outline: 'none', 
                    background: '#fff',
                    color: '#334155',
                    appearance: 'none'
                  }}
                  required
                >
                  {availableChildren.length === 0 ? (
                    <option value="">Tidak ada anak terdaftar</option>
                  ) : (
                    availableChildren.map(anak => (
                      <option key={anak.id} value={anak.id}>
                        {anak.nama_lengkap} ({anak.nama_panggilan || 'Anak'})
                      </option>
                    ))
                  )}
                </select>
                <Smile size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Tanggal cek
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date" 
                  value={form.tanggal} 
                  onChange={e => setForm({ ...form, tanggal: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px 12px 42px', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '14px', 
                    outline: 'none', 
                    color: '#334155' 
                  }} 
                  required 
                />
                <Calendar size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Berat (kg)
                </label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={form.bb} 
                  onChange={e => setForm({ ...form, bb: e.target.value })} 
                  placeholder="32" 
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Tinggi (cm)
                </label>
                <input 
                  type="number" 
                  value={form.tb} 
                  onChange={e => setForm({ ...form, tb: e.target.value })} 
                  placeholder="138" 
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Suhu tubuh (°C)
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  step="0.1" 
                  value={form.suhu} 
                  onChange={e => setForm({ ...form, suhu: e.target.value })} 
                  placeholder="36.6" 
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px 12px 42px', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '14px', 
                    outline: 'none', 
                    color: '#334155' 
                  }} 
                  required 
                />
                <Heart size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Catatan kesehatan
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={form.catatan} 
                  onChange={e => setForm({ ...form, catatan: e.target.value })} 
                  placeholder="Kondisi, keluhan, tindakan" 
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px 12px 42px', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '14px', 
                    outline: 'none', 
                    color: '#334155' 
                  }} 
                />
                <ClipboardCheck size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button 
              type="submit" 
              style={{ 
                background: '#277e70', 
                color: '#fff', 
                border: 'none', 
                padding: '14px', 
                borderRadius: '12px', 
                fontWeight: '600', 
                fontSize: '15px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                cursor: 'pointer',
                marginTop: '8px',
                boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)'
              }}
            >
              <Check size={18} strokeWidth={3} /> Simpan Pemeriksaan
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: TABEL RIWAYAT PEMERIKSAAN */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
            Riwayat Pemeriksaan
          </h2>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
                  <th style={{ padding: '16px' }}>Anak</th>
                  <th style={{ padding: '16px' }}>Tanggal</th>
                  <th style={{ padding: '16px' }}>BB / TB</th>
                  <th style={{ padding: '16px' }}>Suhu</th>
                  <th style={{ padding: '16px' }}>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiwayat.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                      Belum ada riwayat pemeriksaan kesehatan.
                    </td>
                  </tr>
                ) : (
                  filteredRiwayat.map((row) => (
                    <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                      <td style={{ padding: '16px', fontWeight: '700', color: '#0f172a' }}>{row.nama_anak}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>{row.tanggal}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>{row.bb} kg / {row.tb}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>{row.suhu}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>{row.catatan}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
// ================= KOMPONEN KELOLA DATA ORANG TUA (ADMIN) =================
function AdminKelolaOrangTuaTab({ dataOrangTua, setDataOrangTua }) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form State disesuaikan dengan data pada gambar (termasuk username)
  const [form, setForm] = useState({
    nama_lengkap: '',
    username: '',
    email: '',
    telepon: '',
    anak: ''
  });

  function handleOpenAdd() {
    setEditMode(false);
    setCurrentId(null);
    setForm({ nama_lengkap: '', username: '', email: '', telepon: '', anak: '' });
    setModalOpen(true);
  }

  function handleOpenEdit(item) {
    setEditMode(true);
    setCurrentId(item.id);
    setForm({
      nama_lengkap: item.nama_lengkap || '',
      username: item.username || '',
      email: item.email || '',
      telepon: item.telepon || '',
      anak: item.anak || ''
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editMode) {
      setDataOrangTua(prev => prev.map(item => item.id === currentId ? { ...item, ...form } : item));
    } else {
      const newItem = {
        id: Date.now(),
        ...form
      };
      setDataOrangTua(prev => [newItem, ...prev]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus data orang tua ini?')) return;
    setDataOrangTua(prev => prev.filter(item => item.id !== id));
  }

  // Filter pencarian berdasarkan Nama Lengkap, Username, Email, atau Anak
  const filteredOrangTua = dataOrangTua.filter(item =>
    (item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(search.toLowerCase())) ||
    (item.username && item.username.toLowerCase().includes(search.toLowerCase())) ||
    (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
    (item.anak && item.anak.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Data Orang Tua
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
            Akun orang tua dan kontak darurat.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          style={{ 
            background: '#277e70', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '14px', 
            fontWeight: '600', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontSize: '15px',
            boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)'
          }}
        >
          <Plus size={20} strokeWidth={2.5} /> Tambah Orang Tua
        </button>
      </div>

      {/* SEARCH BAR (FULL WIDTH SEPERTI DESAIN RUJUKAN) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          background: '#fff', 
          padding: '14px 20px', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Cari nama / username..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', background: 'transparent', color: '#334155' }}
          />
        </div>
      </div>

      {/* TABEL DATA ORANG TUA */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
              <th style={{ padding: '16px 24px' }}>Nama Lengkap</th>
              <th style={{ padding: '16px 24px' }}>Username</th>
              <th style={{ padding: '16px 24px' }}>Email</th>
              <th style={{ padding: '16px 24px' }}>No. Telepon</th>
              <th style={{ padding: '16px 24px' }}>Anak</th>
              <th style={{ padding: '16px 24px', width: '150px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrangTua.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                  Tidak ada data orang tua yang ditemukan.
                </td>
              </tr>
            ) : (
              filteredOrangTua.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                  <td style={{ padding: '18px 24px', fontWeight: '700', color: '#0f172a' }}>
                    {item.nama_lengkap}
                  </td>
                  <td style={{ padding: '18px 24px', color: '#475569' }}>
                    {item.username || '-'}
                  </td>
                  <td style={{ padding: '18px 24px', color: '#475569' }}>
                    {item.email}
                  </td>
                  <td style={{ padding: '18px 24px', color: '#475569' }}>
                    {item.telepon}
                  </td>
                  <td style={{ padding: '18px 24px', color: '#334155' }}>
                    {item.anak || '—'}
                  </td>
                  <td style={{ padding: '18px 24px' }}>
                    {/* AKSI BUTTONS DENGAN STYLE SESUAI GAMBAR */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => alert(`Detail Orang Tua:\nNama: ${item.nama_lengkap}\nUsername: ${item.username}\nEmail: ${item.email}\nTelepon: ${item.telepon}\nAnak: ${item.anak}`)}
                        style={{ 
                          background: '#e0e7ff', 
                          color: '#3b82f6', 
                          border: 'none', 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '10px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          cursor: 'pointer' 
                        }}
                        title="Lihat Detail"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleOpenEdit(item)}
                        style={{ 
                          background: '#dcfce7', 
                          color: '#16a34a', 
                          border: 'none', 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '10px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          cursor: 'pointer' 
                        }}
                        title="Edit Data"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        style={{ 
                          background: '#fee2e2', 
                          color: '#ef4444', 
                          border: 'none', 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '10px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          cursor: 'pointer' 
                        }}
                        title="Hapus Data"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH / EDIT */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', width: '440px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 18px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
              {editMode ? 'Edit Data Orang Tua' : 'Tambah Data Orang Tua'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Lengkap Orang Tua</label>
                <input 
                  type="text" 
                  value={form.nama_lengkap} 
                  onChange={e => setForm({ ...form, nama_lengkap: e.target.value })} 
                  placeholder="Contoh: Siti Rahmawati"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Username</label>
                <input 
                  type="text" 
                  value={form.username} 
                  onChange={e => setForm({ ...form, username: e.target.value })} 
                  placeholder="Contoh: siti.rahma"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Email</label>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={e => setForm({ ...form, email: e.target.value })} 
                  placeholder="siti@email.com"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>No. Telepon</label>
                <input 
                  type="text" 
                  value={form.telepon} 
                  onChange={e => setForm({ ...form, telepon: e.target.value })} 
                  placeholder="0812-xxxx-xxxx"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Anak</label>
                <input 
                  type="text" 
                  value={form.anak} 
                  onChange={e => setForm({ ...form, anak: e.target.value })} 
                  placeholder="Contoh: Ronaldo (atau gunakan — jika belum ada)"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: '600' }}>
                  Batal
                </button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#277e70', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// ================= KOMPONEN KELOLA DATA PENGASUH (ADMIN) =================
function AdminKelolaPengasuhTab({ dataPengasuh, setDataPengasuh }) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    nama_pengasuh: '',
    no_hp: '',
    status_aktif: 'Aktif',
    jadwal: '0 aktivitas'
  });

  function handleOpenAdd() {
    setEditMode(false);
    setCurrentId(null);
    setForm({ nama_pengasuh: '', no_hp: '', status_aktif: 'Aktif', jadwal: '0 aktivitas' });
    setModalOpen(true);
  }

  function handleOpenEdit(item) {
    setEditMode(true);
    setCurrentId(item.id);
    setForm({
      nama_pengasuh: item.nama_pengasuh || '',
      no_hp: item.no_hp || '',
      status_aktif: item.status_aktif || 'Aktif',
      jadwal: item.jadwal || '0 aktivitas'
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editMode) {
      setDataPengasuh(prev => prev.map(item => item.id === currentId ? { ...item, ...form } : item));
    } else {
      const newItem = {
        id: Date.now(),
        ...form
      };
      setDataPengasuh(prev => [newItem, ...prev]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus data pengasuh ini?')) return;
    setDataPengasuh(prev => prev.filter(item => item.id !== id));
  }

  const filteredPengasuh = dataPengasuh.filter(item =>
    item.nama_pengasuh.toLowerCase().includes(search.toLowerCase()) ||
    item.no_hp.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Data Pengasuh
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
            Kelola pengasuh dan status aktifnya 
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          style={{ 
            background: '#277e70', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '14px', 
            fontWeight: '600', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontSize: '15px',
            boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)'
          }}
        >
          <Plus size={20} strokeWidth={2.5} /> Tambah Pengasuh
        </button>
      </div>

      {/* SEARCH BAR (FULL WIDTH) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          background: '#fff', 
          padding: '14px 20px', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Cari nama pengasuh..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', background: 'transparent', color: '#334155' }}
          />
        </div>
      </div>

      {/* TABEL DATA PENGASUH */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
              <th style={{ padding: '16px 24px' }}>Nama Pengasuh</th>
              <th style={{ padding: '16px 24px' }}>No. HP</th>
              <th style={{ padding: '16px 24px' }}>Status Aktif</th>
              <th style={{ padding: '16px 24px' }}>Jadwal Minggu Ini</th>
              <th style={{ padding: '16px 24px', width: '130px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPengasuh.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                  Tidak ada data pengasuh yang ditemukan.
                </td>
              </tr>
            ) : (
              filteredPengasuh.map((item) => {
                const isAktif = item.status_aktif === 'Aktif';
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                    <td style={{ padding: '18px 24px', fontWeight: '700', color: '#0f172a' }}>
                      {item.nama_pengasuh}
                    </td>
                    <td style={{ padding: '18px 24px', color: '#475569' }}>
                      {item.no_hp}
                    </td>
                    <td style={{ padding: '18px 24px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600', 
                        background: isAktif ? '#dcfce7' : '#fee2e2', 
                        color: isAktif ? '#15803d' : '#ef4444',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        • {item.status_aktif}
                      </span>
                    </td>
                    <td style={{ padding: '18px 24px', color: '#475569' }}>
                      {item.jadwal}
                    </td>
                    <td style={{ padding: '18px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          style={{ 
                            background: '#dcfce7', 
                            color: '#16a34a', 
                            border: 'none', 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            cursor: 'pointer' 
                          }}
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          style={{ 
                            background: '#fee2e2', 
                            color: '#ef4444', 
                            border: 'none', 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            cursor: 'pointer' 
                          }}
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH / EDIT PENGASUH */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', width: '440px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 18px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
              {editMode ? 'Edit Data Pengasuh' : 'Tambah Pengasuh Baru'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Pengasuh</label>
                <input 
                  type="text" 
                  value={form.nama_pengasuh} 
                  onChange={e => setForm({ ...form, nama_pengasuh: e.target.value })} 
                  placeholder="Contoh: Bu Rina"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>No. HP</label>
                <input 
                  type="text" 
                  value={form.no_hp} 
                  onChange={e => setForm({ ...form, no_hp: e.target.value })} 
                  placeholder="0811-xxxx-xxxx"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Status Aktif</label>
                <select 
                  value={form.status_aktif} 
                  onChange={e => setForm({ ...form, status_aktif: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', outline: 'none' }}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: '600' }}>
                  Batal
                </button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#277e70', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// ================= KOMPONEN KELOLA DATA ANAK (ADMIN) =================
function AdminKelolaAnakTab ({ dataAnak, setDataAnak, user }) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    nama_lengkap: '',
    nama_panggilan: '',
    jenis_kelamin: 'Laki-laki',
    golongan_darah: 'O',
    tanggal_lahir: '',
    orang_tua: ''
  });

  function handleOpenAdd() {
    setEditMode(false);
    setCurrentId(null);
    setForm({ 
      nama_lengkap: '', 
      nama_panggilan: '', 
      jenis_kelamin: 'Laki-laki', 
      golongan_darah: 'O', 
      tanggal_lahir: '', 
      orang_tua: '' 
    });
    setModalOpen(true);
  }

  function handleOpenEdit(item) {
    setEditMode(true);
    setCurrentId(item.id);
    setForm({
      nama_lengkap: item.nama_lengkap || '',
      nama_panggilan: item.nama_panggilan || '',
      jenis_kelamin: item.jenis_kelamin || 'Laki-laki',
      golongan_darah: item.golongan_darah || 'O',
      tanggal_lahir: item.tanggal_lahir ? item.tanggal_lahir.substring(0, 10) : '',
      orang_tua: item.orang_tua || ''
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editMode) {
      setDataAnak(prev => prev.map(item => item.id === currentId ? { ...item, ...form } : item));
    } else {
      const newItem = {
        id: Date.now(),
        ...form
      };
      setDataAnak(prev => [newItem, ...prev]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus data anak ini?')) return;
    setDataAnak(prev => prev.filter(item => item.id !== id));
  }

  const filteredAnak = dataAnak.filter(item =>
    (item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(search.toLowerCase())) ||
    (item.nama_panggilan && item.nama_panggilan.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER UTAMA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Pengelolaan Data Anak Asuh
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
            Informasi profil, kesehatan, dan catatan khusus anak di daycare.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          style={{ 
            background: '#277e70', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '14px', 
            fontWeight: '600', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontSize: '15px',
            boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)'
          }}
        >
          <Plus size={20} strokeWidth={2.5} /> Tambah Anak
        </button>
      </div>

      {/* SEARCH BAR FULL WIDTH */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          background: '#fff', 
          padding: '14px 20px', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Cari nama anak..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', background: 'transparent', color: '#334155' }}
          />
        </div>
      </div>

      {/* GRID KARTU ANAK */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredAnak.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            Tidak ada data anak yang ditemukan.
          </div>
        ) : (
          filteredAnak.map((item) => (
            <div 
              key={item.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                {/* HEADER KARTU: INISIAL & NAMA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                  <div style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', 
                    background: '#e6f4ea', 
                    color: '#137333', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold', 
                    fontSize: '20px',
                    flexShrink: 0 
                  }}>
                    {item.nama_lengkap ? item.nama_lengkap.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                      {item.nama_lengkap}
                    </h3>
                    <span style={{ fontSize: '13px', color: '#64748b', marginTop: '2px', display: 'block' }}>
                      Panggilan: {item.nama_panggilan || '-'}
                    </span>
                  </div>
                </div>

                {/* DETAIL INFORMASI ANAK */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={16} color="#64748b" />
                    <span>Lahir: {item.tanggal_lahir ? item.tanggal_lahir.substring(0, 10) : '-'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Smile size={16} color="#64748b" />
                    <span>Kelamin: {item.jenis_kelamin || 'Laki-laki'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={16} color="#64748b" />
                    <span>Gol. Darah: {item.golongan_darah || '-'}</span>
                  </div>
                </div>
              </div>

              <div>
                {/* INFO ORANG TUA */}
                <div style={{ background: '#f0fdf4', color: '#15803d', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '16px' }}>
                  Orang Tua: {item.orang_tua || 'Batam'}
                </div>

                {/* TOMBOL AKSI (EDIT & HAPUS) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    onClick={() => handleOpenEdit(item)}
                    style={{ 
                      background: '#dcfce7', 
                      color: '#16a34a', 
                      border: 'none', 
                      padding: '10px', 
                      borderRadius: '10px', 
                      fontWeight: '600', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px', 
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ 
                      background: '#fee2e2', 
                      color: '#ef4444', 
                      border: 'none', 
                      padding: '10px', 
                      borderRadius: '10px', 
                      fontWeight: '600', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px', 
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL TAMBAH / EDIT ANAK */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', width: '460px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 18px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
              {editMode ? 'Edit Data Anak' : 'Tambah Data Anak'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Lengkap Anak</label>
                <input 
                  type="text" 
                  value={form.nama_lengkap} 
                  onChange={e => setForm({ ...form, nama_lengkap: e.target.value })} 
                  placeholder="Contoh: Aldis Burger"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Panggilan</label>
                <input 
                  type="text" 
                  value={form.nama_panggilan} 
                  onChange={e => setForm({ ...form, nama_panggilan: e.target.value })} 
                  placeholder="Contoh: aldis"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Jenis Kelamin</label>
                  <select 
                    value={form.jenis_kelamin} 
                    onChange={e => setForm({ ...form, jenis_kelamin: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', outline: 'none' }}
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Gol. Darah</label>
                  <select 
                    value={form.golongan_darah} 
                    onChange={e => setForm({ ...form, golongan_darah: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff', outline: 'none' }}
                  >
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Tanggal Lahir</label>
                <input 
                  type="date" 
                  value={form.tanggal_lahir} 
                  onChange={e => setForm({ ...form, tanggal_lahir: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#fff' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Orang Tua / Wali</label>
                <input 
                  type="text" 
                  value={form.orang_tua} 
                  onChange={e => setForm({ ...form, orang_tua: e.target.value })} 
                  placeholder="Contoh: batam / Siti Rahmawati"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: '600' }}>
                  Batal
                </button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#277e70', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}// ================= KOMPONEN TAB JADWAL & KEGIATAN / AKTIVITAS =================
function JadwalKegiatanTab({ isAdminOrStaff, listJadwal, setListJadwal }) {
  const [activeDay, setActiveDay] = useState('Sen 26');
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    waktu: '',
    nama_aktivitas: '',
    pengasuh: 'Bu Rina',
    tanggal: '26 Okt 2026',
    keterangan: ''
  });

  const hariList = [
    { id: 'Sen 26', label: 'Sen 26', tanggal: '26 Okt 2026' },
    { id: 'Sel 27', label: 'Sel 27', tanggal: '27 Okt 2026' },
    { id: 'Rab 28', label: 'Rab 28', tanggal: '28 Okt 2026' },
    { id: 'Kam 29', label: 'Kam 29', tanggal: '29 Okt 2026' },
    { id: 'Jum 30', label: 'Jum 30', tanggal: '30 Okt 2026' }
  ];

  function handleOpenAdd() {
    setEditMode(false);
    setCurrentId(null);
    const selectedHariObj = hariList.find(h => h.id === activeDay);
    setForm({
      waktu: '',
      nama_aktivitas: '',
      pengasuh: 'Bu Rina',
      tanggal: selectedHariObj ? selectedHariObj.tanggal : '26 Okt 2026',
      keterangan: ''
    });
    setModalOpen(true);
  }

  function handleOpenEdit(item) {
    setEditMode(true);
    setCurrentId(item.id);
    setForm({
      waktu: item.waktu || item.jam || '',
      nama_aktivitas: item.nama_aktivitas || item.kegiatan || '',
      pengasuh: item.pengasuh || 'Bu Rina',
      tanggal: item.tanggal || '26 Okt 2026',
      keterangan: item.keterangan || ''
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editMode) {
      setListJadwal(prev => prev.map(item => item.id === currentId ? { 
        ...item, 
        waktu: form.waktu, 
        jam: form.waktu, 
        nama_aktivitas: form.nama_aktivitas, 
        kegiatan: form.nama_aktivitas, 
        pengasuh: form.pengasuh, 
        tanggal: form.tanggal, 
        keterangan: form.keterangan 
      } : item));
    } else {
      const newItem = {
        id: Date.now(),
        waktu: form.waktu,
        jam: form.waktu,
        nama_aktivitas: form.nama_aktivitas,
        kegiatan: form.nama_aktivitas,
        pengasuh: form.pengasuh,
        tanggal: form.tanggal,
        keterangan: form.keterangan
      };
      setListJadwal(prev => [...prev, newItem]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus aktivitas ini?')) return;
    setListJadwal(prev => prev.filter(item => item.id !== id));
  }

  // Filter jadwal berdasarkan tanggal/hari aktif
  const currentTanggalStr = hariList.find(h => h.id === activeDay)?.tanggal || '26 Okt 2026';
  const filteredJadwal = listJadwal.filter(item => {
    if (!item.tanggal) return true; // fallback jika data lama
    return item.tanggal === currentTanggalStr;
  });

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER & TOMBOL TAMBAH AKTIVITAS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Jadwal &amp; Aktivitas
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
            Atur kegiatan harian dan pengasuh yang bertugas.
          </p>
        </div>

        {isAdminOrStaff && (
          <button 
            onClick={handleOpenAdd}
            style={{ 
              background: '#277e70', 
              color: '#fff', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '14px', 
              fontWeight: '600', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer', 
              fontSize: '15px',
              boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)'
            }}
          >
            <Plus size={20} strokeWidth={2.5} /> Tambah Aktivitas
          </button>
        )}
      </div>

      {/* NAVIGASI HARI (BADGE PILL) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {hariList.map(h => {
          const isActive = activeDay === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setActiveDay(h.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: isActive ? 'none' : '1px solid #cbd5e1',
                background: isActive ? '#277e70' : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: isActive ? '0 2px 6px rgba(39,126,112,0.25)' : 'none'
              }}
            >
              {h.label}
            </button>
          );
        })}
      </div>

      {/* TABEL JADWAL & AKTIVITAS */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
              <th style={{ padding: '16px 20px', width: '150px' }}>Waktu</th>
              <th style={{ padding: '16px 20px' }}>Nama Aktivitas</th>
              <th style={{ padding: '16px 20px' }}>Pengasuh</th>
              <th style={{ padding: '16px 20px' }}>Tanggal</th>
              <th style={{ padding: '16px 20px' }}>Keterangan   </th>
              {isAdminOrStaff && <th style={{ padding: '16px 20px', width: '120px', textAlign: 'center' }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filteredJadwal.length === 0 ? (
              <tr>
                <td colSpan={isAdminOrStaff ? 6 : 5} style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                  Tidak ada jadwal aktivitas untuk hari ini.
                </td>
              </tr>
            ) : (
              filteredJadwal.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                  <td style={{ padding: '18px 20px', fontWeight: '700', color: '#0f172a' }}>
                    {item.waktu || item.jam}
                  </td>
                  <td style={{ padding: '18px 20px', fontWeight: '600', color: '#1e293b' }}>
                    {item.nama_aktivitas || item.kegiatan}
                  </td>
                  <td style={{ padding: '18px 20px', color: '#475569' }}>
                    {item.pengasuh || 'Bu Rina'}
                  </td>
                  <td style={{ padding: '18px 20px', color: '#475569' }}>
                    {item.tanggal || currentTanggalStr}
                  </td>
                  <td style={{ padding: '18px 20px', color: '#64748b' }}>
                    {item.keterangan || '-'}
                  </td>
                  {isAdminOrStaff && (
                    <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          style={{ background: '#dcfce7', color: '#16a34a', border: 'none', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH / EDIT AKTIVITAS */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', width: '460px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 18px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
              {editMode ? 'Edit Aktivitas' : 'Tambah Aktivitas Baru'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Waktu (Contoh: 07.30–08.30)</label>
                <input 
                  type="text" 
                  value={form.waktu} 
                  onChange={e => setForm({ ...form, waktu: e.target.value })} 
                  placeholder="07.30–08.30"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Nama Aktivitas</label>
                <input 
                  type="text" 
                  value={form.nama_aktivitas} 
                  onChange={e => setForm({ ...form, nama_aktivitas: e.target.value })} 
                  placeholder="Penyambutan & Sarapan"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Pengasuh Bertugas</label>
                <input 
                  type="text" 
                  value={form.pengasuh} 
                  onChange={e => setForm({ ...form, pengasuh: e.target.value })} 
                  placeholder="Bu Rina"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Tanggal</label>
                <input 
                  type="text" 
                  value={form.tanggal} 
                  onChange={e => setForm({ ...form, tanggal: e.target.value })} 
                  placeholder="26 Okt 2026"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>Keterangan</label>
                <textarea 
                  rows={2}
                  value={form.keterangan} 
                  onChange={e => setForm({ ...form, keterangan: e.target.value })} 
                  placeholder="Sarapan bersama"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', resize: 'vertical' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: '600' }}>
                  Batal
                </button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#277e70', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// ================= KOMPONEN TAB ABSENSI & REKAP KEHADIRAN =================
function AbsensiTab({ isAdminOrStaff, dataAnak, listAbsensi, setListAbsensi }) {
  const todayStr = new Date().toISOString().substring(0, 10);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedMonth, setSelectedMonth] = useState(todayStr.substring(0, 7)); // YYYY-MM
  const [viewMode, setViewMode] = useState('harian'); // 'harian' atau 'rekap'

  // Fungsi untuk mengubah status kehadiran secara langsung
  function handleStatusChange(anakId, newStatus) {
    setListAbsensi(prev => {
      const existingIndex = prev.findIndex(item => item.anak_id === anakId && item.tanggal === selectedDate);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], status: newStatus };
        return copy;
      } else {
        const anakObj = dataAnak.find(a => a.id === anakId);
        return [...prev, {
          id: Date.now(),
          anak_id: anakId,
          nama_anak: anakObj ? anakObj.nama_lengkap : 'Anak',
          tanggal: selectedDate,
          status: newStatus
        }];
      }
    });
  }

  function getStatus(anakId, tanggal = selectedDate) {
    const found = listAbsensi.find(item => item.anak_id === anakId && item.tanggal === tanggal);
    return found ? found.status : 'Hadir'; // Default Hadir
  }

  const totalHadir = dataAnak.filter(a => getStatus(a.id) === 'Hadir').length;
  const totalIzin = dataAnak.filter(a => getStatus(a.id) === 'Izin').length;
  const totalSakit = dataAnak.filter(a => getStatus(a.id) === 'Sakit').length;
  const totalAlpa = dataAnak.filter(a => getStatus(a.id) === 'Alpa').length;

  function getRekapBulanan(anakId) {
    const records = listAbsensi.filter(a => a.anak_id === anakId && a.tanggal.startsWith(selectedMonth));
    const hadir = records.filter(a => a.status === 'Hadir').length;
    const izin = records.filter(a => a.status === 'Izin').length;
    const sakit = records.filter(a => a.status === 'Sakit').length;
    const alpa = records.filter(a => a.status === 'Alpa').length;
    const totalHari = records.length || 1;
    const persen = Math.round((hadir / totalHari) * 100);

    return { hadir, izin, sakit, alpa, totalHari, persen };
  }

  function handlePrintLaporan() {
    const printWindow = window.open('', '_blank');
    const contentHtml = document.getElementById('printable-absensi-area').innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Laporan Absensi Daycare</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #0f172a; }
            h2 { margin-bottom: 4px; }
            p { color: #64748b; font-size: 13px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; font-size: 13px; }
            th { background-color: #f8fafc; color: #334155; }
          </style>
        </head>
        <body>
          <h2>Laporan Rekapitulasi Kehadiran Daycare</h2>
          <p>Dicetak pada: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
          ${contentHtml}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  const badgeStyles = {
    'Hadir': { bg: '#dcfce7', color: '#15803d' },
    'Izin': { bg: '#fef3c7', color: '#b45309' },
    'Sakit': { bg: '#eff6ff', color: '#2563eb' },
    'Alpa': { bg: '#fef2f2', color: '#dc2626' }
  };

  return (
    <div style={{ padding: '8px 4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Absensi & Rekap Kehadiran
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
            {isAdminOrStaff ? 'Kelola absensi harian dan rekap bulanan anak asuh daycare.' : 'Pantau catatan kehadiran si kecil secara harian dan bulanan.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: '#e2e8f0', padding: '4px', borderRadius: '10px', display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setViewMode('harian')}
              style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: viewMode === 'harian' ? '#fff' : 'transparent', fontWeight: viewMode === 'harian' ? 'bold' : 'normal', cursor: 'pointer', fontSize: '13px', color: '#0f172a' }}
            >
              Absensi Harian
            </button>
            <button
              onClick={() => setViewMode('rekap')}
              style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: viewMode === 'rekap' ? '#fff' : 'transparent', fontWeight: viewMode === 'rekap' ? 'bold' : 'normal', cursor: 'pointer', fontSize: '13px', color: '#0f172a' }}
            >
              Rekap Bulanan
            </button>
          </div>

          {viewMode === 'harian' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
              <Calendar size={16} color="#64748b" />
              <input 
                type="date" 
                value={selectedDate} 
                onChange={e => setSelectedDate(e.target.value)} 
                style={{ border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', fontWeight: '600', color: '#1e293b' }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
              <Calendar size={16} color="#64748b" />
              <input 
                type="month" 
                value={selectedMonth} 
                onChange={e => setSelectedMonth(e.target.value)} 
                style={{ border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', fontWeight: '600', color: '#1e293b' }}
              />
            </div>
          )}

          {isAdminOrStaff && (
            <button
              onClick={handlePrintLaporan}
              style={{ background: '#277e70', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}
            >
              🖨️ Cetak Laporan
            </button>
          )}
        </div>
      </div>

      <div id="printable-absensi-area">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '14px', border: '1px solid #dcfce7' }}>
            <div style={{ fontSize: '12px', color: '#15803d', fontWeight: '600' }}>Hadir</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#14532d', marginTop: '4px' }}>{totalHadir} Anak</div>
          </div>
          <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '14px', border: '1px solid #fde68a' }}>
            <div style={{ fontSize: '12px', color: '#b45309', fontWeight: '600' }}>Izin</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#78350f', marginTop: '4px' }}>{totalIzin} Anak</div>
          </div>
          <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '12px', color: '#1d4ed8', fontWeight: '600' }}>Sakit</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', marginTop: '4px' }}>{totalSakit} Anak</div>
          </div>
          <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '14px', border: '1px solid #fecaca' }}>
            <div style={{ fontSize: '12px', color: '#b91c1c', fontWeight: '600' }}>Alpa</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7f1d1d', marginTop: '4px' }}>{totalAlpa} Anak</div>
          </div>
        </div>

        {viewMode === 'harian' ? (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 20px', width: '60px' }}>No</th>
                  <th style={{ padding: '14px 20px' }}>Nama Lengkap Anak</th>
                  <th style={{ padding: '14px 20px' }}>Panggilan</th>
                  <th style={{ padding: '14px 20px' }}>Tanggal</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center' }}>Status Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                {dataAnak.map((anak, index) => {
                  const currentStatus = getStatus(anak.id);
                  const styleBadge = badgeStyles[currentStatus] || badgeStyles['Hadir'];

                  return (
                    <tr key={anak.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                      <td style={{ padding: '14px 20px', color: '#64748b', fontWeight: '500' }}>{index + 1}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 'bold' }}>{anak.nama_lengkap}</td>
                      <td style={{ padding: '14px 20px', color: '#475569' }}>{anak.nama_panggilan || '-'}</td>
                      <td style={{ padding: '14px 20px', color: '#475569' }}>{selectedDate}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        {isAdminOrStaff ? (
                          <select
                            value={currentStatus}
                            onChange={(e) => handleStatusChange(anak.id, e.target.value)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '600',
                              background: styleBadge.bg,
                              color: styleBadge.color,
                              border: '1px solid #cbd5e1',
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="Hadir">Hadir</option>
                            <option value="Izin">Izin</option>
                            <option value="Sakit">Sakit</option>
                            <option value="Alpa">Alpa</option>
                          </select>
                        ) : (
                          <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', background: styleBadge.bg, color: styleBadge.color, display: 'inline-block' }}>
                            {currentStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', color: '#0f172a', fontSize: '15px' }}>
              Rekap Kehadiran Bulan: {selectedMonth}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 20px' }}>Nama Anak</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center' }}>Hadir</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center' }}>Izin</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center' }}>Sakit</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center' }}>Alpa</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center' }}>% Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                {dataAnak.map(anak => {
                  const rekap = getRekapBulanan(anak.id);
                  return (
                    <tr key={anak.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 'bold', color: '#1e293b' }}>{anak.nama_lengkap}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: '#15803d', fontWeight: 'bold' }}>{rekap.hadir}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: '#b45309' }}>{rekap.izin}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: '#2563eb' }}>{rekap.sakit}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: '#dc2626' }}>{rekap.alpa}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold', color: '#15803d' }}>{rekap.persen}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
// ================= KOMPONEN TAB BOOKING PENITIPAN ANAK (ORANG TUA) =================
function BookingTab({ dataAnakSaya, onGoToAddAnak, onGoToBeranda, onAddBooking, listRiwayatBooking = [], setListRiwayatBooking }) {
  const [viewState, setViewState] = useState('list'); // 'list' atau 'form'
  const [filterStatus, setFilterStatus] = useState('Semua');
  
  const [step, setStep] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const [selectedPackage, setSelectedPackage] = useState('harian');
  const [selectedChild, setSelectedChild] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [buktiBayar, setBuktiBayar] = useState(null);
  const [successBooking, setSuccessBooking] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [copied, setCopied] = useState(false);

  const paketList = [
    { id: 'harian', nama: 'Harian', harga: 100000, desc: 'Penitipan harian standar (08.00 - 16.00)' },
    { id: 'fullday', nama: 'Full Day', harga: 190000, desc: 'Penitipan seharian penuh + aktivitas ekstra' },
    { id: 'mingguan', nama: 'Paket Mingguan (5 Hari)', harga: 450000, desc: 'Hemat untuk penitipan Senin s.d. Jumat' }
  ];

  // Data awal riwayat booking jika kosong
  const [bookings, setBookings] = useState([
    { id: 'BK-0013', anak: 'Rima Azzahra M.', tanggal: '2 Nov 2026', paket: 'Harian', total: 'Rp 100.000', status: 'Menunggu Verifikasi' },
    { id: 'BK-0012', anak: 'Dzaky Asyam A.', tanggal: '26 Okt 2026', paket: 'Full Day', total: 'Rp 190.000', status: 'Selesai' },
    { id: 'BK-0011', anak: 'Rima Azzahra M.', tanggal: '19 Okt 2026', paket: 'Mingguan', total: 'Rp 450.000', status: 'Selesai' },
    { id: 'BK-0010', anak: 'Rima Azzahra M.', tanggal: '12 Okt 2026', paket: 'Harian', total: 'Rp 100.000', status: 'Dibatalkan' },
  ]);

  const filteredBookings = bookings.filter(item => {
    if (filterStatus === 'Semua') return true;
    if (filterStatus === 'Menunggu') return item.status.includes('Menunggu');
    if (filterStatus === 'Dikonfirmasi') return item.status === 'Dikonfirmasi';
    if (filterStatus === 'Selesai') return item.status === 'Selesai';
    if (filterStatus === 'Dibatalkan') return item.status === 'Dibatalkan';
    return true;
  });

  function handlePrevMonth() {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function handleNextMonth() {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const adjustedFirstDayIndex = (firstDayIndex === 0 ? 6 : firstDayIndex - 1);
  const totalDays = new Date(year, month + 1, 0).getDate();

  const activePaket = paketList.find(p => p.id === selectedPackage) || paketList[0];
  const activeAnak = dataAnakSaya.find(a => a.id === selectedChild);

  function handleNext(e) {
    e.preventDefault();
    if (step === 3 && !selectedChild) {
      alert('Silakan pilih anak terlebih dahulu.');
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  }

  function handleFinalSubmit(e) {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `BK-${randomNum}`;
    setBookingCode(newCode);

    const newBookingItem = {
      id: newCode,
      anak: activeAnak?.nama_lengkap || dataAnakSaya[0]?.nama_lengkap || 'Anak',
      tanggal: selectedDate,
      paket: activePaket.nama,
      total: `Rp ${activePaket.harga.toLocaleString('id-ID')}`,
      status: 'Menunggu Verifikasi'
    };

    setBookings([newBookingItem, ...bookings]);

    if (onAddBooking) {
      onAddBooking({
        id: newCode,
        nama_anak: newBookingItem.anak,
        tanggal: selectedDate,
        paket: activePaket.nama,
        status: 'Menunggu',
        harga: activePaket.harga
      });
    }

    setSuccessBooking(true);
  }

  function copyCode() {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const getStatusBadge = (status) => {
    if (status.includes('Menunggu')) return { bg: '#fef3c7', color: '#b45309' };
    if (status === 'Selesai') return { bg: '#eff6ff', color: '#2563eb' };
    if (status === 'Dibatalkan') return { bg: '#fee2e2', color: '#dc2626' };
    return { bg: '#dcfce7', color: '#15803d' };
  };

  // TAMPILAN 1: HALAMAN UTAMA TAB BOOKING (RIWAYAT & TOMBOL BUAT BOOKING)
  if (viewState === 'list' && !successBooking) {
    return (
      <div style={{ padding: '8px 4px' }}>
        {/* HEADER & TOMBOL BUAT BOOKING */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
              Booking Penitipan Anak
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
              Riwayat dan status booking penitipan.
            </p>
          </div>

          <button 
            onClick={() => { setViewState('form'); setStep(1); }}
            style={{ 
              background: '#198754', 
              color: '#fff', 
              border: 'none', 
              padding: '12px 22px', 
              borderRadius: '14px', 
              fontWeight: '600', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer', 
              fontSize: '14px',
              boxShadow: '0 2px 6px rgba(25, 135, 84, 0.2)'
            }}
          >
            <Plus size={18} strokeWidth={2.5} /> Buat Booking
          </button>
        </div>

        {/* FILTER STATUS PILLS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['Semua', 'Menunggu', 'Dikonfirmasi', 'Selesai', 'Dibatalkan'].map(status => {
            const isActive = filterStatus === status;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '30px',
                  border: isActive ? 'none' : '1px solid #cbd5e1',
                  background: isActive ? '#198754' : '#ffffff',
                  color: isActive ? '#ffffff' : '#475569',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 6px rgba(25, 135, 84, 0.2)' : 'none'
                }}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* TABEL RIWAYAT BOOKING */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                <th style={{ padding: '16px 20px' }}>Kode</th>
                <th style={{ padding: '16px 20px' }}>Anak</th>
                <th style={{ padding: '16px 20px' }}>Tanggal</th>
                <th style={{ padding: '16px 20px' }}>Paket</th>
                <th style={{ padding: '16px 20px' }}>Total</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 20px', textAlign: 'center', width: '120px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                    Belum ada riwayat booking penitipan.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((item) => {
                  const badge = getStatusBadge(item.status);
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                      <td style={{ padding: '16px 20px', fontWeight: '700', color: '#0f172a' }}>{item.id}</td>
                      <td style={{ padding: '16px 20px', fontWeight: '600' }}>{item.anak}</td>
                      <td style={{ padding: '16px 20px', color: '#475569' }}>{item.tanggal}</td>
                      <td style={{ padding: '16px 20px', color: '#475569' }}>{item.paket}</td>
                      <td style={{ padding: '16px 20px', fontWeight: '600', color: '#1e293b' }}>{item.total}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: badge.bg, color: badge.color, display: 'inline-block' }}>
                          • {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button 
                            onClick={() => alert(`Detail Booking:\nKode: ${item.id}\nAnak: ${item.anak}\nTanggal: ${item.tanggal}\nPaket: ${item.paket}\nTotal: ${item.total}\nStatus: ${item.status}`)}
                            style={{ background: '#e0e7ff', color: '#3b82f6', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            title="Lihat Detail"
                          >
                            <Eye size={16} />
                          </button>
                          {item.status.includes('Menunggu') && (
                            <button 
                              onClick={() => {
                                if (window.confirm('Batalkan booking ini?')) {
                                  setBookings(bookings.map(b => b.id === item.id ? { ...b, status: 'Dibatalkan' } : b));
                                }
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              title="Batalkan"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // TAMPILAN 2: KETIKA KLIK "BUAT BOOKING" (TAHAPAN BOOKING LAMA)
  return (
    <div style={{ padding: '8px 4px' }}>
      {!successBooking && (
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
              {step === 4 ? 'Konfirmasi Booking' : 'Booking Penitipan Anak'}
            </h1>
            {step !== 4 && (
              <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                Pilih jadwal, paket, dan daftarkan penitipan si kecil dengan mudah.
              </p>
            )}
          </div>
          <button 
            type="button" 
            onClick={() => setViewState('list')} 
            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
          >
            ← Kembali ke Riwayat
          </button>
        </div>
      )}

      {successBooking ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ background: '#fff', padding: '48px 40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', maxWidth: '480px', width: '100%' }}>
            <div style={{ width: '80px', height: '80px', background: '#dbeafe', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
              <div style={{ width: '56px', height: '56px', background: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={32} strokeWidth={3} />
              </div>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '12px' }}>
              Booking Berhasil!
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', marginBottom: '28px', padding: '0 10px' }}>
              Reservasi penitipan anak telah berhasil dilakukan. Silakan lakukan pembayaran sesuai metode yang dipilih.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', padding: '14px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', fontWeight: '500', marginBottom: '2px' }}>Kode Booking</span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', letterSpacing: '0.5px' }}>{bookingCode}</span>
              </div>
              <button 
                onClick={copyCode} 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb', padding: '6px', borderRadius: '6px' }}
                title="Salin Kode"
              >
                <Copy size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => {
                  setSuccessBooking(false);
                  setStep(1);
                  setViewState('list');
                }}
                style={{ width: '100%', background: '#198754', border: 'none', color: '#fff', padding: '12px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
              >
                Kembali ke Daftar Booking
              </button>
            </div>

          </div>
        </div>
      ) : (
        <div>
          {step < 4 && (
            <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {[
                { no: 1, label: 'Pilih Tanggal' },
                { no: 2, label: 'Pilih Paket' },
                { no: 3, label: 'Detail Anak' },
                { no: 4, label: 'Konfirmasi' }
              ].map((s, idx) => (
                <div key={s.no} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: idx < 3 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ 
                      width: '36px', height: '36px', borderRadius: '50%', 
                      background: step === s.no ? '#2563eb' : step > s.no ? '#16a34a' : '#f1f5f9', 
                      color: step >= s.no ? '#fff' : '#64748b', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' 
                    }}>
                      {step > s.no ? '✓' : s.no}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: step === s.no ? '600' : '400', color: step === s.no ? '#2563eb' : '#64748b' }}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && <div style={{ height: '2px', background: step > s.no ? '#16a34a' : '#e2e8f0', flex: 1, margin: '0 8px' }} />}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleNext}>
            {step === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#0f172a' }}>
                    <button type="button" onClick={handlePrevMonth} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>&lt;</button>
                    <span>{monthNames[month]} {year}</span>
                    <button type="button" onClick={handleNextMonth} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>&gt;</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
                    <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '8px', fontSize: '14px' }}>
                    {Array.from({ length: adjustedFirstDayIndex }).map((_, i) => <span key={`empty-${i}`} />)}
                    {Array.from({ length: totalDays }).map((_, i) => {
                      const day = i + 1;
                      const monthStr = String(month + 1).padStart(2, '0');
                      const dayStr = String(day).padStart(2, '0');
                      const dateStr = `${year}-${monthStr}-${dayStr}`;
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDate(dateStr)}
                          style={{
                            padding: '10px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                            background: isSelected ? '#2563eb' : 'transparent',
                            color: isSelected ? '#fff' : '#1e293b',
                            fontWeight: isSelected ? 'bold' : 'normal'
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Pilih Paket</h3>
                    {paketList.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedPackage(p.id)}
                        style={{ 
                          padding: '14px', borderRadius: '12px', border: selectedPackage === p.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          background: selectedPackage === p.id ? '#eff6ff' : '#fff', marginBottom: '12px', cursor: 'pointer' 
                        }}
                      >
                        <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>{p.nama}</div>
                        <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600', marginTop: '2px' }}>Rp {p.harga.toLocaleString('id-ID')} / hari</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                      Tanggal dipilih:<br/><b>{selectedDate}</b>
                    </div>
                    <button type="submit" style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                      Lanjut
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Konfirmasi Paket &amp; Jadwal</h3>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>Tanggal Penitipan: <b>{selectedDate}</b></div>
                  <div>Paket Dipilih: <b>{activePaket.nama}</b></div>
                  <div>Estimasi Biaya: <b>Rp {activePaket.harga.toLocaleString('id-ID')}</b></div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setStep(1)} style={{ flex: 1, background: '#f1f5f9', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Kembali</button>
                  <button type="submit" style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Lanjut ke Detail Anak</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Pilih Anak yang Dititipkan</h3>

                {dataAnakSaya.length === 0 ? (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '20px' }}>
                    <p style={{ color: '#b91c1c', fontSize: '14px', margin: '0 0 12px 0' }}>
                      Anda belum mendaftarkan data anak. Silakan tambahkan data anak terlebih dahulu.
                    </p>
                    <button type="button" onClick={onGoToAddAnak} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                      + Tambah Data Anak
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                    {dataAnakSaya.map(anak => (
                      <div 
                        key={anak.id}
                        onClick={() => setSelectedChild(anak.id)}
                        style={{ 
                          padding: '16px', borderRadius: '12px', border: selectedChild === anak.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          background: selectedChild === anak.id ? '#eff6ff' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' 
                        }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          {anak.nama_lengkap ? anak.nama_lengkap.charAt(0) : 'A'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{anak.nama_lengkap}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            Panggilan: {anak.nama_panggilan || '-'} | Lahir: {anak.tanggal_lahir?.substring(0, 10)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button type="button" onClick={() => setStep(2)} style={{ flex: 1, background: '#f1f5f9', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Kembali</button>
                  <button type="submit" disabled={dataAnakSaya.length === 0} style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', opacity: dataAnakSaya.length === 0 ? 0.5 : 1 }}>Lanjut ke Konfirmasi</button>
                </div>
              </div>
            )}
          </form>

          {step === 4 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Detail Pemesanan</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '14px' }}>
                          <div style={{ width: '32px', height: '32px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}><User size={16}/></div>
                          Nama Anak
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>
                          {activeAnak?.nama_lengkap || dataAnakSaya[0]?.nama_lengkap || 'Anak'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '14px' }}>
                          <div style={{ width: '32px', height: '32px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}><Calendar size={16}/></div>
                          Tanggal
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>
                          {selectedDate}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '14px' }}>
                          <div style={{ width: '32px', height: '32px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}><Star size={16}/></div>
                          Paket
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>
                          {activePaket.nama}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #e2e8f0', paddingTop: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '14px' }}>
                          <div style={{ width: '32px', height: '32px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}><CreditCard size={16}/></div>
                          Total Harga
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '15px' }}>
                          Rp {activePaket.harga.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Metode Pembayaran</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { id: 'transfer', label: 'Transfer Bank' },
                        { id: 'ewallet', label: 'E-Wallet' },
                        { id: 'tunai', label: 'Tunai' }
                      ].map(m => (
                        <label 
                          key={m.id}
                          style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px',
                            background: paymentMethod === m.id ? '#eff6ff' : '#fff', border: paymentMethod === m.id ? '1px solid #bfdbfe' : '1px solid #f1f5f9',
                            cursor: 'pointer', fontWeight: paymentMethod === m.id ? '600' : '400', color: '#1e293b', fontSize: '14px'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            value={m.id} 
                            checked={paymentMethod === m.id} 
                            onChange={() => setPaymentMethod(m.id)}
                            style={{ accentColor: '#2563eb' }}
                          />
                          {m.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Ringkasan</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Subtotal</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>Rp {activePaket.harga.toLocaleString('id-ID')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Biaya Lain-lain</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>Rp 0</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '4px' }}>
                        <span style={{ color: '#64748b' }}>Total</span>
                        <span style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '15px' }}>Rp {activePaket.harga.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Upload Bukti Pembayaran</h3>
                    <label style={{ 
                      border: '2px dashed #bfdbfe', borderRadius: '12px', padding: '32px 16px', display: 'flex', 
                      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fafafa' 
                    }}>
                      <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '12px' }}>
                        <Upload size={20} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#2563eb', marginBottom: '4px' }}>
                        {buktiBayar ? buktiBayar.name : 'Klik untuk mengunggah'}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>(Format: JPG, PNG, PDF)</span>
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        onChange={e => setBuktiBayar(e.target.files[0])} 
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px' }}>
                <button 
                  type="button" 
                  onClick={() => setStep(3)} 
                  style={{ background: '#fff', border: '1.5px solid #cbd5e1', color: '#475569', padding: '10px 28px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
                >
                  Kembali
                </button>
                <button 
                  type="button" 
                  onClick={handleFinalSubmit}
                  style={{ background: '#198754', border: 'none', color: '#fff', padding: '10px 28px', borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
                >
                  Konfirmasi Booking
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ================= KOMPONEN PEMBAYARAN & UPLOAD BUKTI (ORANG TUA) =================
function PembayaranTab({ onNavigateTab }) {
  const [step, setStep] = useState('list'); // 'list' atau 'success'
  const [bulanTagihan, setBulanTagihan] = useState('November 2026');
  const [jumlahTagihan, setJumlahTagihan] = useState(1500000);
  const [tanggalBayar, setTanggalBayar] = useState('26 Okt 2026');
  const [buktiFile, setBuktiFile] = useState(null);

  function handleUpload(e) {
    e.preventDefault();
    // Proses simpan / upload bukti
    setStep('success');
  }

  if (step === 'success') {
    return (
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '24px', 
          border: '1px solid #e2e8f0', 
          padding: '40px 32px', 
          maxWidth: '540px', 
          width: '100%', 
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          {/* ICON CENTANG SUKSES */}
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: '#dcfce7', 
            color: '#16a34a', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px auto' 
          }}>
            <Check size={40} strokeWidth={3} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#13392a', margin: '0 0 8px 0' }}>
            Bukti pembayaran terkirim
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 auto 28px auto', maxWidth: '420px', lineHeight: '1.5' }}>
            Admin akan memverifikasi dalam 1×24 jam. Anda akan menerima notifikasi setelah status berubah. 
          </p>

          {/* KARTU DETAIL PEMBAYARAN */}
          <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', marginBottom: '28px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
              <span style={{ color: '#64748b' }}>Bulan tagihan </span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{bulanTagihan} </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
              <span style={{ color: '#64748b' }}>Jumlah </span>
              <span style={{ fontWeight: '700', color: '#0f172a' }}>Rp {jumlahTagihan.toLocaleString('id-ID')} </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
              <span style={{ color: '#64748b' }}>Tanggal bayar </span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{tanggalBayar} </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', alignItems: 'center', fontSize: '14px' }}>
              <span style={{ color: '#64748b' }}>Status </span>
              <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: '#fef3c7', color: '#b45309' }}>
                • Pending 
              </span>
            </div>
          </div>

          {/* TOMBOL AKSI */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button 
              onClick={() => setStep('list')}
              style={{ 
                background: '#198754', 
                color: '#fff', 
                border: 'none', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                fontWeight: '600', 
                fontSize: '13px', 
                cursor: 'pointer' 
              }}
            >
              Lihat Riwayat Pembayaran 
            </button>
            <button 
              onClick={() => onNavigateTab && onNavigateTab('beranda')}
              style={{ 
                background: '#ffffff', 
                color: '#1e293b', 
                border: '1px solid #cbd5e1', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                fontWeight: '600', 
                fontSize: '13px', 
                cursor: 'pointer' 
              }}
            >
              Kembali ke Beranda 
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Pembayaran & Tagihan
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
          Selesaikan pembayaran bulanan dan unggah bukti transfer.
        </p>
      </div>

      {/* FORM UPLOAD BUKTI PEMBAYARAN */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', maxWidth: '600px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 16px 0' }}>
          Form Upload Bukti Pembayaran
        </h3>

        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Bulan Tagihan
            </label>
            <input 
              type="text" 
              value={bulanTagihan} 
              onChange={e => setBulanTagihan(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
              required 
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Jumlah Tagihan (Rp)
            </label>
            <input 
              type="number" 
              value={jumlahTagihan} 
              onChange={e => setJumlahTagihan(Number(e.target.value))}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
              required 
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Tanggal Bayar
            </label>
            <input 
              type="text" 
              value={tanggalBayar} 
              onChange={e => setTanggalBayar(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
              required 
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
              File Bukti Pembayaran (JPG/PNG/PDF)
            </label>
            <input 
              type="file" 
              onChange={e => setBuktiFile(e.target.files[0])}
              style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#f8fafc' }}
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button 
              type="submit" 
              style={{ 
                background: '#198754', 
                color: '#fff', 
                border: 'none', 
                padding: '12px 28px', 
                borderRadius: '12px', 
                fontWeight: '600', 
                fontSize: '14px', 
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(25, 135, 84, 0.2)' 
              }}
            >
              Kirim Bukti Pembayaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// ================= KOMPONEN KEUANGAN & TAGIHAN / VERIFIKASI (ADMIN) =================
function KeuanganTab() {
  const [filterStatus, setFilterStatus] = useState('Pending');
  const [modalTinjauOpen, setModalTinjauOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [catatanPenolakan, setCatatanPenolakan] = useState('');

  // State data keuangan / pembayaran
  const [listKeuangan, setListKeuangan] = useState([
    { 
      id: 1, 
      anak: 'Rima Azzahra', 
      orang_tua: 'Siti Rahmawati', 
      bulan: 'Oktober 2026', 
      jumlah: 1500000, 
      tgl_bayar: '24 Okt 2026', 
      bukti: 'bukti_okt.jpg', 
      status: 'Pending',
      diverifikasi_oleh: '—'
    },
    { 
      id: 2, 
      anak: 'Dzaky', 
      orang_tua: 'Rina Kartika', 
      bulan: 'Oktober 2026', 
      jumlah: 1500000, 
      tgl_bayar: '25 Okt 2026', 
      bukti: 'bukti_zahra.png', 
      status: 'Pending',
      diverifikasi_oleh: '—'
    },
    { 
      id: 3, 
      anak: 'Aldis', 
      orang_tua: 'Batam', 
      bulan: 'September 2026', 
      jumlah: 1500000, 
      tgl_bayar: '02 Okt 2026', 
      bukti: 'bukti_sep.pdf', 
      status: 'Disetujui',
      diverifikasi_oleh: 'Admin'
    },
    { 
      id: 4, 
      anak: 'Ronaldo', 
      orang_tua: 'Siti Rahmawati', 
      bulan: 'September 2026', 
      jumlah: 1500000, 
      tgl_bayar: '03 Okt 2026', 
      bukti: 'bukti_sep.jpg', 
      status: 'Ditolak',
      diverifikasi_oleh: 'Admin'
    }
  ]);

  const countPending = listKeuangan.filter(item => item.status === 'Pending').length;
  const countDisetujui = listKeuangan.filter(item => item.status === 'Disetujui').length;
  const countDitolak = listKeuangan.filter(item => item.status === 'Ditolak').length;

  const filteredList = listKeuangan.filter(item => {
    if (filterStatus.toLowerCase() === 'semua') return true;
    return item.status.toLowerCase() === filterStatus.toLowerCase();
  });

  function handleOpenTinjau(item) {
    setSelectedData(item);
    setCatatanPenolakan('');
    setModalTinjauOpen(true);
  }

  function handleUpdateStatus(newStatus) {
    if (!selectedData) return;
    setListKeuangan(prev => prev.map(item => item.id === selectedData.id ? { 
      ...item, 
      status: newStatus, 
      diverifikasi_oleh: 'Admin' 
    } : item));
    setModalTinjauOpen(false);
    alert(`Pembayaran berhasil ${newStatus === 'Disetujui' ? 'disetujui' : 'ditolak'}.`);
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'disetujui':
        return { bg: '#dcfce7', color: '#15803d', label: 'Disetujui' };
      case 'pending':
        return { bg: '#fef3c7', color: '#b45309', label: 'Pending' };
      case 'ditolak':
        return { bg: '#fee2e2', color: '#b91c1c', label: 'Ditolak' };
      default:
        return { bg: '#f1f5f9', color: '#64748b', label: status };
    }
  };

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER UTAMA */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Keuangan & Tagihan
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
          Verifikasi bukti pembayaran dari orang tua .
        </p>
      </div>

      {/* 3 KARTU STATISTIK */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div style={{ background: '#fef9c3', borderRadius: '20px', padding: '24px', border: '1px solid #fef08a', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <Clock size={28} color="#ca8a04" />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#854d0e', lineHeight: '1' }}>{countPending}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#a16207', marginTop: '6px' }}>Pending</div>
          </div>
        </div>

        <div style={{ background: '#dcfce7', borderRadius: '20px', padding: '24px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <Check size={28} color="#16a34a" strokeWidth={3} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#14532d', lineHeight: '1' }}>{countDisetujui}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#15803d', marginTop: '6px' }}>Disetujui</div>
          </div>
        </div>

        <div style={{ background: '#ffedd5', borderRadius: '20px', padding: '24px', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <AlertCircle size={28} color="#ea580c" />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#9a3412', lineHeight: '1' }}>{countDitolak}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#c2410c', marginTop: '6px' }}>Ditolak</div>
          </div>
        </div>
      </div>

      {/* FILTER STATUS */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['Semua', 'Pending', 'Disetujui', 'Ditolak'].map(status => {
          const isActive = filterStatus === status;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: isActive ? 'none' : '1px solid #cbd5e1',
                background: isActive ? '#277e70' : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: isActive ? '0 2px 6px rgba(39,126,112,0.25)' : 'none'
              }}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* TABEL KEUANGAN */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
              <th style={{ padding: '16px 20px' }}>Anak </th>
              <th style={{ padding: '16px 20px' }}>Bulan </th>
              <th style={{ padding: '16px 20px' }}>Jumlah </th>
              <th style={{ padding: '16px 20px' }}>Tgl Bayar </th>
              <th style={{ padding: '16px 20px' }}>Bukti </th>
              <th style={{ padding: '16px 20px' }}>Status </th>
              <th style={{ padding: '16px 20px', width: '130px', textAlign: 'center' }}>Aksi </th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                  Tidak ada data tagihan pada kategori ini.
                </td>
              </tr>
            ) : (
              filteredList.map((item) => {
                const badge = getStatusBadge(item.status);
                const isPending = item.status === 'Pending';
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                    <td style={{ padding: '18px 20px', fontWeight: '700', color: '#0f172a' }}>{item.anak} </td>
                    <td style={{ padding: '18px 20px', color: '#475569' }}>{item.bulan} </td>
                    <td style={{ padding: '18px 20px', fontWeight: '600', color: '#1e293b' }}>Rp {item.jumlah.toLocaleString('id-ID')} </td>
                    <td style={{ padding: '18px 20px', color: '#475569' }}>{item.tgl_bayar} </td>
                    <td style={{ padding: '18px 20px', color: '#2563eb', fontWeight: '500' }}>{item.bukti} </td>
                    <td style={{ padding: '18px 20px' }}>
                      <span style={{ 
                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                        background: badge.bg, color: badge.color, display: 'inline-flex', alignItems: 'center', gap: '4px'
                      }}>
                        • {badge.label} 
                      </span>
                    </td>
                    <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                      {isPending ? (
                        <button 
                          onClick={() => handleOpenTinjau(item)}
                          style={{ 
                            background: '#198754', color: '#fff', border: 'none', padding: '8px 16px', 
                            borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                            display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 auto'
                          }}
                        >
                          <Eye size={15} /> Tinjau 
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenTinjau(item)}
                          style={{ 
                            background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '8px 16px', 
                            borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', margin: '0 auto'
                          }}
                        >
                          Lihat 
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL / HALAMAN TINJAU BUKTI PEMBAYARAN PERSIS SEPERTI GAMBAR RUJUKAN */}
      {modalTinjauOpen && selectedData && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: '36px', borderRadius: '24px', width: '900px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            
            {/* Header Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                  Verifikasi Pembayaran 
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                  Tinjau bukti pembayaran {selectedData.anak} · {selectedData.bulan} 
                </p>
              </div>
              <button 
                onClick={() => setModalTinjauOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            {/* Layout 2 Kolom: Kiri (Bukti Pembayaran), Kanan (Detail Pembayaran) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'start' }}>
              
              {/* Kolom Kiri: Pratinjau Bukti Pembayaran */}
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                  Bukti Pembayaran 
                </h3>
                <div style={{ background: '#ffffff', borderRadius: '12px', height: '360px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#64748b' }}>
                  <div style={{ width: '60px', height: '60px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    📄
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{selectedData.bukti} </span>
                </div>
              </div>

              {/* Kolom Kanan: Detail Pembayaran & Aksi */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                  Detail Pembayaran 
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Orang tua </span>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedData.orang_tua} </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Anak </span>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedData.anak} </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Bulan tagihan </span>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedData.bulan} </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Jumlah tagihan </span>
                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>Rp {selectedData.jumlah.toLocaleString('id-ID')} </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Tanggal bayar </span>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedData.tgl_bayar} </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>Status </span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: getStatusBadge(selectedData.status).bg, color: getStatusBadge(selectedData.status).color }}>
                      • {selectedData.status} 
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Diverifikasi oleh </span>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{selectedData.diverifikasi_oleh} </span>
                  </div>
                </div>

                {/* Catatan Penolakan */}
                <div style={{ marginTop: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Catatan penolakan (opsional) 
                  </label>
                  <input 
                    type="text" 
                    value={catatanPenolakan}
                    onChange={e => setCatatanPenolakan(e.target.value)}
                    placeholder="Contoh: bukti buram, nominal tidak sesuai"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                {/* Tombol Tolak & Setujui */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button 
                    onClick={() => handleUpdateStatus('Ditolak')}
                    style={{ 
                      background: '#fee2e2', color: '#dc2626', border: 'none', padding: '10px 20px', 
                      borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    ✕ Tolak 
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus('Disetujui')}
                    style={{ 
                      background: '#198754', color: '#fff', border: 'none', padding: '10px 24px', 
                      borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    ✓ Setujui
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ================= KOMPONEN RIWAYAT & PEMBAYARAN (ORANG TUA) =================
function RiwayatTab({ onNavigateUpload }) {
  const [listTagihan, setListTagihan] = useState([
    {
      id: 1,
      bulan: 'Nov 2026',
      jumlah: 'Rp 1.500.000',
      tanggalBayar: '—',
      bukti: '—',
      status: 'Belum Dibayar',
      aksi: 'upload'
    },
    {
      id: 2,
      bulan: 'Okt 2026',
      jumlah: 'Rp 1.500.000',
      tanggalBayar: '24 Okt 2026',
      bukti: 'bukti_okt.jpg',
      status: 'Pending',
      aksi: 'pending'
    },
    {
      id: 3,
      bulan: 'Sep 2026',
      jumlah: 'Rp 1.500.000',
      tanggalBayar: '03 Okt 2026',
      bukti: 'bukti_sep.jpg',
      status: 'Ditolak',
      aksi: 'ulang'
    },
    {
      id: 4,
      bulan: 'Agu 2026',
      jumlah: 'Rp 1.500.000',
      tanggalBayar: '05 Agu 2026',
      bukti: 'bukti_agu.pdf',
      status: 'Disetujui',
      aksi: 'lunas'
    },
    {
      id: 5,
      bulan: 'Jul 2026',
      jumlah: 'Rp 1.500.000',
      tanggalBayar: '04 Jul 2026',
      bukti: 'bukti_jul.jpg',
      status: 'Disetujui',
      aksi: 'lunas'
    }
  ]);

  function getStatusBadge(status) {
    switch (status) {
      case 'Belum Dibayar':
        return { bg: '#eff6ff', color: '#2563eb' };
      case 'Pending':
        return { bg: '#fef3c7', color: '#b45309' };
      case 'Ditolak':
        return { bg: '#fee2e2', color: '#dc2626' };
      case 'Disetujui':
        return { bg: '#dcfce7', color: '#15803d' };
      default:
        return { bg: '#f1f5f9', color: '#64748b' };
    }
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER & TOMBOL UPLOAD BUKTI */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Pembayaran
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
            Tagihan bulanan dan status pembayaran.
          </p>
        </div>

        <button 
          onClick={() => onNavigateUpload && onNavigateUpload()}
          style={{ 
            background: '#198754', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 20px', 
            borderRadius: '12px', 
            fontWeight: '600', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontSize: '14px',
            boxShadow: '0 2px 6px rgba(25, 135, 84, 0.2)'
          }}
        >
          <Upload size={18} /> Upload Bukti
        </button>
      </div>

      {/* KARTU RINGKASAN STATUS (3 KOTAK) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* PENDING */}
        <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '16px', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#78350f' }}>1</div>
            <div style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>Pending (menunggu verifikasi)</div>
          </div>
        </div>

        {/* DISETUJUI */}
        <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '16px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Check size={24} strokeWidth={3} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#14532d' }}>3</div>
            <div style={{ fontSize: '13px', color: '#166534', fontWeight: '600' }}>Disetujui</div>
          </div>
        </div>

        {/* DITOLAK */}
        <div style={{ background: '#fee2e2', padding: '20px', borderRadius: '16px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <X size={24} strokeWidth={3} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7f1d1d' }}>1</div>
            <div style={{ fontSize: '13px', color: '#991b1b', fontWeight: '600' }}>Ditolak</div>
          </div>
        </div>
      </div>

      {/* TABEL RIWAYAT TAGIHAN */}
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 20px' }}>Bulan Tagihan</th>
              <th style={{ padding: '16px 20px' }}>Jumlah</th>
              <th style={{ padding: '16px 20px' }}>Tanggal Bayar</th>
              <th style={{ padding: '16px 20px' }}>Bukti Pembayaran</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {listTagihan.map((item) => {
              const badge = getStatusBadge(item.status);

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold' }}>{item.bulan}</td>
                  <td style={{ padding: '16px 20px', color: '#475569' }}>{item.jumlah}</td>
                  <td style={{ padding: '16px 20px', color: '#475569' }}>{item.tanggalBayar}</td>
                  <td style={{ padding: '16px 20px', color: item.bukti === '—' ? '#94a3b8' : '#2563eb', fontWeight: item.bukti === '—' ? 'normal' : '500' }}>
                    {item.bukti}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: badge.bg, color: badge.color, display: 'inline-block' }}>
                      • {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {item.aksi === 'upload' && (
                      <button onClick={() => onNavigateUpload && onNavigateUpload()} style={{ background: '#198754', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '10px', fontWeight: '600', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Upload size={14} /> Upload Bukti
                      </button>
                    )}
                    {item.aksi === 'pending' && (
                      <span style={{ color: '#64748b', fontSize: '13px' }}>Menunggu verifikasi admin</span>
                    )}
                    {item.aksi === 'ulang' && (
                      <button onClick={() => onNavigateUpload && onNavigateUpload()} style={{ background: '#fff', color: '#1e293b', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '10px', fontWeight: '600', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Upload size={14} /> Upload Ulang
                      </button>
                    )}
                    {item.aksi === 'lunas' && (
                      <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '13px' }}>Lunas</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CATATAN BAWAH */}
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
        Catatan: tagihan berstatus Ditolak dapat diunggah ulang. Status mengikuti ERD: Pending → Disetujui / Ditolak.
      </div>
    </div>
  );
}
// ================= KOMPONEN TAB NOTIFIKASI =================
function NotifikasiTab({ listRiwayat = [] }) {
  const defaultNotifikasi = [
    {
      id: 'notif-1',
      judul: 'Selamat Datang di Daycare Ceria! 👋',
      pesan: 'Terima kasih telah bergabung dengan sistem informasi kami. Nikmati kemudahan penitipan anak dalam satu genggaman.',
      waktu: 'Kemarin, 10:00 WIB',
      tipe: 'info',
      dibaca: true
    },
    {
      id: 'notif-2',
      judul: 'Jadwal Imunisasi & Kesehatan 🩺',
      pesan: 'Pengingat: Pemeriksaan kesehatan rutin anak asuh akan diadakan pada hari Jumat minggu ini.',
      waktu: '2 hari lalu',
      tipe: 'warning',
      dibaca: true
    },
    {
      id: 'notif-3',
      judul: 'Promo Paket Mingguan 🎉',
      pesan: 'Dapatkan diskon khusus untuk pendaftaran Paket Mingguan bulan ini. Hubungi admin untuk info lebih lanjut.',
      waktu: '3 hari lalu',
      tipe: 'promo',
      dibaca: false
    }
  ];

  const dynamicNotifikasi = listRiwayat.map((item, index) => ({
    id: `notif-dyn-${item.id || index}`,
    judul: `Booking Berhasil #${item.id}`,
    pesan: `Reservasi untuk anak ${item.nama_anak} (${item.paket}) pada tanggal ${item.tanggal} berhasil dibuat.`,
    waktu: 'Baru saja',
    tipe: 'success',
    dibaca: false
  }));

  const allNotifikasi = [...dynamicNotifikasi, ...defaultNotifikasi];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
          Notifikasi
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
          Informasi terbaru, status booking, dan pengingat penting seputar daycare.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {allNotifikasi.map((notif) => {
          let iconBg = '#eff6ff';
          let iconColor = '#2563eb';
          if (notif.tipe === 'success') {
            iconBg = '#dcfce7';
            iconColor = '#16a34a';
          } else if (notif.tipe === 'warning') {
            iconBg = '#fef3c7';
            iconColor = '#d97706';
          } else if (notif.tipe === 'promo') {
            iconBg = '#f3e8ff';
            iconColor = '#9333ea';
          }

          return (
            <div
              key={notif.id}
              style={{
                background: notif.dibaca ? '#ffffff' : '#f0fdf4',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ 
                width: '44px', height: '44px', borderRadius: '50%', 
                background: iconBg, color: iconColor, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
              }}>
                <Bell size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                    {notif.judul}
                  </h3>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{notif.waktu}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                  {notif.pesan}
                </p>
              </div>

              {!notif.dibaca && (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', alignSelf: 'center' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ================= KOMPONEN PROFIL SAYA (ORANG TUA) =================
function ProfilOrangtuaTab({ user }) {
  const [formData, setFormData] = useState({
    nama_lengkap: user?.nama_lengkap || 'Siti Rahmawati',
    username: user?.username || 'siti.rahma',
    email: user?.email || 'siti@email.com',
    nomor_telepon: user?.nomor_telepon || '0812xxxxxxxx',
    alamat: 'Jl. Melati No. 5, Batam',
    pekerjaan: 'Karyawan swasta',
    no_hp_darurat: '0813xxxxxxxx'
  });

  const [successMsg, setSuccessMsg] = useState('');

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg('Perubahan profil berhasil disimpan!');
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Profil Saya
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
          Kelola data akun dan kontak darurat.
        </p>
      </div>

      {successMsg && (
        <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>
          ✓ {successMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '20px', 
          padding: '32px 24px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '90px', 
            height: '90px', 
            borderRadius: '50%', 
            background: '#e6f4ea', 
            color: '#137333', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '16px' 
          }}>
            <UserRound size={44} strokeWidth={1.8} />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 10px 0' }}>
            {formData.nama_lengkap}
          </h2>

          <div style={{ 
            display: 'inline-block', 
            background: '#e6f4ea', 
            color: '#137333', 
            padding: '4px 16px', 
            borderRadius: '20px', 
            fontSize: '13px', 
            fontWeight: '600',
            marginBottom: '14px' 
          }}>
            Orang Tua
          </div>

          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Terdaftar sejak Sep 2026
          </span>
        </div>

        <div style={{ 
          background: '#ffffff', 
          borderRadius: '20px', 
          padding: '32px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)' 
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
            Data Akun
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Nama lengkap
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="nama_lengkap"
                    value={formData.nama_lengkap} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155' }} 
                    required 
                  />
                  <UserRound size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155' }} 
                    required 
                  />
                  <UserRound size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155' }} 
                    required 
                  />
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Nomor telepon
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="nomor_telepon"
                    value={formData.nomor_telepon} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155' }} 
                    required 
                  />
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Alamat
              </label>
              <input 
                type="text" 
                name="alamat"
                value={formData.alamat} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155' }} 
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Pekerjaan
                </label>
                <input 
                  type="text" 
                  name="pekerjaan"
                  value={formData.pekerjaan} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  No. HP darurat
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="no_hp_darurat"
                    value={formData.no_hp_darurat} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155' }} 
                  />
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <button 
                type="button" 
                onClick={() => setFormData({
                  nama_lengkap: user?.nama_lengkap || 'Siti Rahmawati',
                  username: user?.username || 'siti.rahma',
                  email: user?.email || 'siti@email.com',
                  nomor_telepon: user?.nomor_telepon || '0812xxxxxxxx',
                  alamat: 'Jl. Melati No. 5, Batam',
                  pekerjaan: 'Karyawan swasta',
                  no_hp_darurat: '0813xxxxxxxx'
                })}
                style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
              >
                Batal
              </button>

              <button 
                type="submit" 
                style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#277e70', color: '#ffffff', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)' }}
              >
                ✓ Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
// ================= KOMPONEN PROFIL SAYA (ORANG TUA) =================
function ProfilTab({ user }) {
  const [formData, setFormData] = useState({
    nama_lengkap: user?.nama_lengkap || 'Siti Rahmawati',
    username: user?.username || 'siti.rahma',
    email: user?.email || 'siti@email.com',
    nomor_telepon: user?.nomor_telepon || '0812xxxxxxxx',
    alamat: 'Jl. Melati No. 5, Batam',
    pekerjaan: 'Karyawan swasta',
    no_hp_darurat: '0813xxxxxxxx'
  });

  const [successMsg, setSuccessMsg] = useState('');

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg('Perubahan profil berhasil disimpan!');
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER UTAMA */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Profil Saya
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
          Kelola data akun dan kontak darurat. 
        </p>
      </div>

      {successMsg && (
        <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>
          ✓ {successMsg}
        </div>
      )}

      {/* LAYOUT 2 KOLOM DENGAN JARAK RAPAT */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: KARTU PROFIL */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '20px', 
          padding: '32px 24px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* AVATAR ICON */}
          <div style={{ 
            width: '90px', 
            height: '90px', 
            borderRadius: '50%', 
            background: '#e6f4ea', 
            color: '#137333', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '16px' 
          }}>
            <UserRound size={44} strokeWidth={1.8} />
          </div>

          {/* NAMA LENGKAP */}
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 10px 0' }}>
            {formData.nama_lengkap} 
          </h2>

          {/* BADGE ORANG TUA */}
          <div style={{ 
            display: 'inline-block', 
            background: '#e6f4ea', 
            color: '#137333', 
            padding: '4px 16px', 
            borderRadius: '20px', 
            fontSize: '13px', 
            fontWeight: '600',
            marginBottom: '14px' 
          }}>
            Orang Tua 
          </div>

          {/* KETERANGAN TERDAFTAR */}
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Terdaftar sejak Sep 2026 
          </span>
        </div>

        {/* KOLOM KANAN: FORM DATA AKUN */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '20px', 
          padding: '32px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)' 
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
            Data Akun 
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* ROW 1: NAMA LENGKAP & USERNAME */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Nama lengkap 
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="nama_lengkap"
                    value={formData.nama_lengkap} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', boxSizing: 'border-box' }} 
                    required 
                  />
                  <UserRound size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Username 
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', boxSizing: 'border-box' }} 
                    required 
                  />
                  <UserRound size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            {/* ROW 2: EMAIL & NOMOR TELEPON */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Email 
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', boxSizing: 'border-box' }} 
                    required 
                  />
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Nomor telepon 
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="nomor_telepon"
                    value={formData.nomor_telepon} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', boxSizing: 'border-box' }} 
                    required 
                  />
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            {/* ROW 3: ALAMAT */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Alamat 
              </label>
              <input 
                type="text" 
                name="alamat"
                value={formData.alamat} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', boxSizing: 'border-box' }} 
                required 
              />
            </div>

            {/* ROW 4: PEKERJAAN & NO HP DARURAT */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Pekerjaan 
                </label>
                <input 
                  type="text" 
                  name="pekerjaan"
                  value={formData.pekerjaan} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  No. HP darurat 
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="no_hp_darurat"
                    value={formData.no_hp_darurat} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', color: '#334155', boxSizing: 'border-box' }} 
                  />
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            {/* TOMBOL AKSI: BATAL & SIMPAN PERUBAHAN */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <button 
                type="button" 
                onClick={() => setFormData({
                  nama_lengkap: user?.nama_lengkap || 'Siti Rahmawati',
                  username: user?.username || 'siti.rahma',
                  email: user?.email || 'siti@email.com',
                  nomor_telepon: user?.nomor_telepon || '0812xxxxxxxx',
                  alamat: 'Jl. Melati No. 5, Batam',
                  pekerjaan: 'Karyawan swasta',
                  no_hp_darurat: '0813xxxxxxxx'
                })}
                style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
              >
                Batal 
              </button>

              <button 
                type="submit" 
                style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#198754', color: '#ffffff', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(25, 135, 84, 0.2)' }}
              >
                ✓ Simpan Perubahan 
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
// ================= KOMPONEN PROFIL DAYCARE / PENGATURAN (ADMIN) =================
function ProfilDaycareTab({ daycarePhoto, setDaycarePhoto, daycareLocation, setDaycareLocation }) {
  const [formData, setFormData] = useState({
    nama: 'Daycare Ceria',
    alamat: daycareLocation || 'Jl. Melati No. 12, Batam',
    telepon: '0778-xxxxxx',
    jam_operasional: '07.00 – 17.00 WIB',
    deskripsi: 'Ruang aman, hangat, dan menyenangkan untuk si kecil belajar dan bermain.'
  });

  const [previewPhoto, setPreviewPhoto] = useState(daycarePhoto || '/image/daycare.jpg');

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewPhoto(imageUrl);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (setDaycareLocation) setDaycareLocation(formData.alamat);
    if (setDaycarePhoto) setDaycarePhoto(previewPhoto);
    alert('Profil daycare berhasil diperbarui!');
  }

  return (
    <div style={{ padding: '8px 4px' }}>
      {/* HEADER UTAMA */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Profil Daycare
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>
          Informasi yang tampil di beranda orang tua.
        </p>
      </div>

      {/* LAYOUT 2 KOLOM (PRATINJAU & DATA DAYCARE) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: PRATINJAU */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
            Pratinjau
          </h2>

          {/* AREA FOTO PREVIEW */}
          <div style={{ 
            width: '100%', 
            height: '180px', 
            borderRadius: '16px', 
            background: '#bbf7d0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: '16px',
            position: 'relative'
          }}>
            {previewPhoto && previewPhoto !== '/image/daycare.jpg' ? (
              <img src={previewPhoto} alt="Pratinjau Daycare" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#277e70', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Home size={32} />
              </div>
            )}
          </div>

          {/* TOMBOL GANTI FOTO */}
          <label style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: '#e6f4ea', 
            color: '#16a34a', 
            padding: '8px 16px', 
            borderRadius: '10px', 
            fontWeight: '600', 
            fontSize: '13px', 
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
            <Upload size={16} /> Ganti Foto
            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          </label>

          {/* TEXT PRATINJAU */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#15803d', margin: '0 0 6px 0' }}>
              {formData.nama || 'Daycare Ceria'}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              {formData.alamat || 'Jl. Melati No. 12, Batam'}
            </p>
          </div>
        </div>

        {/* KOLOM KANAN: FORM DATA DAYCARE */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
            Data Daycare
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* NAMA DAYCARE */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Nama daycare
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  name="nama"
                  value={formData.nama} 
                  onChange={handleChange}
                  placeholder="Daycare Ceria" 
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px 12px 42px', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '14px', 
                    outline: 'none', 
                    color: '#334155' 
                  }} 
                  required 
                />
                <Home size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* ALAMAT */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Alamat
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  name="alamat"
                  value={formData.alamat} 
                  onChange={handleChange}
                  placeholder="Jl. Melati No. 12, Batam" 
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px 12px 42px', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '14px', 
                    outline: 'none', 
                    color: '#334155' 
                  }} 
                  required 
                />
                <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* NO TELEPON & JAM OPERASIONAL */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  No. telepon
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="telepon"
                    value={formData.telepon} 
                    onChange={handleChange}
                    placeholder="0778-xxxxxx" 
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px 12px 42px', 
                      borderRadius: '12px', 
                      border: '1px solid #cbd5e1', 
                      fontSize: '14px', 
                      outline: 'none', 
                      color: '#334155' 
                    }} 
                    required 
                  />
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Jam operasional
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="jam_operasional"
                    value={formData.jam_operasional} 
                    onChange={handleChange}
                    placeholder="07.00 – 17.00 WIB" 
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px 12px 42px', 
                      borderRadius: '12px', 
                      border: '1px solid #cbd5e1', 
                      fontSize: '14px', 
                      outline: 'none', 
                      color: '#334155' 
                    }} 
                    required 
                  />
                  <Clock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            {/* DESKRIPSI */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Deskripsi
              </label>
              <textarea 
                rows={3}
                name="deskripsi"
                value={formData.deskripsi} 
                onChange={handleChange}
                placeholder="Ruang aman, hangat, dan menyenangkan untuk si kecil belajar dan bermain." 
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  border: '1px solid #cbd5e1', 
                  fontSize: '14px', 
                  outline: 'none', 
                  color: '#334155',
                  resize: 'vertical'
                }} 
              />
            </div>

            {/* TOMBOL BATAL & SIMPAN */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button 
                type="button" 
                onClick={() => {
                  setFormData({
                    nama: 'Daycare Ceria',
                    alamat: daycareLocation || 'Jl. Melati No. 12, Batam',
                    telepon: '0778-xxxxxx',
                    jam_operasional: '07.00 – 17.00 WIB',
                    deskripsi: 'Ruang aman, hangat, dan menyenangkan untuk si kecil belajar dan bermain.'
                  });
                }}
                style={{ 
                  padding: '12px 24px', 
                  borderRadius: '12px', 
                  border: '1px solid #cbd5e1', 
                  background: '#ffffff', 
                  color: '#475569', 
                  fontWeight: '600', 
                  fontSize: '14px', 
                  cursor: 'pointer' 
                }}
              >
                Batal
              </button>

              <button 
                type="submit" 
                style={{ 
                  padding: '12px 24px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: '#277e70', 
                  color: '#ffffff', 
                  fontWeight: '600', 
                  fontSize: '14px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(39, 126, 112, 0.2)'
                }}
              >
                <Check size={18} strokeWidth={3} /> Simpan Profil
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

// ================= KOMPONEN BOOKING ADMIN =================
function AdminBookingTab({ dataAnak, dataOrangTua, listBooking, setListBooking }) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    anak_id: dataAnak[0]?.id || '',
    tanggal: new Date().toISOString().slice(0, 10),
    paket: 'Harian',
    status: 'Menunggu'
  });

  const paketHarga = {
    Harian: 100000,
    'Full Day': 190000,
    'Paket Mingguan (5 Hari)': 450000
  };

  const getNamaOrangTua = (anak) => {
    const parent = dataOrangTua.find(item =>
      item.anak === anak?.nama_lengkap
    );
    return parent?.nama_lengkap || '-';
  };

  const filtered = listBooking.filter(item =>
    [item.nama_anak, item.nama_orang_tua, item.id, item.paket, item.status]
      .some(value => String(value || '').toLowerCase().includes(search.toLowerCase()))
  );

  function handleSubmit(e) {
    e.preventDefault();
    const anak = dataAnak.find(item => String(item.id) === String(form.anak_id));
    if (!anak) {
      alert('Pilih data anak yang tersedia.');
      return;
    }
    const booking = {
      id: `BK${Date.now().toString().slice(-8)}`,
      nama_anak: anak.nama_lengkap,
      nama_orang_tua: getNamaOrangTua(anak),
      tanggal: form.tanggal,
      paket: form.paket,
      status: form.status,
      harga: paketHarga[form.paket]
    };
    setListBooking(prev => [booking, ...prev]);
    setModalOpen(false);
    setForm({ anak_id: dataAnak[0]?.id || '', tanggal: new Date().toISOString().slice(0, 10), paket: 'Harian', status: 'Menunggu' });
  }

  function updateStatus(id, status) {
    setListBooking(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  }

  function deleteBooking(id) {
    if (!window.confirm('Hapus data booking ini?')) return;
    setListBooking(prev => prev.filter(item => item.id !== id));
  }

  const cardStyle = {
    background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px',
    padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
  };
  const inputStyle = {
    width: '100%', padding: '11px 13px', borderRadius: '10px',
    border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff',
    color: '#334155', boxSizing: 'border-box'
  };

  return (
    <div style={{ padding: '8px 4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Booking Penitipan</h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0' }}>Kelola reservasi berdasarkan data anak dan orang tua yang tersedia.</p>
        </div>
        <button onClick={() => setModalOpen(true)} style={{ background: '#277e70', color: '#fff', border: 0, padding: '12px 20px', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <Plus size={18}/> Buat Booking
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 22 }}>
        {[
          { label: 'Total Booking', value: listBooking.length, color: '#eff6ff', ink: '#2563eb' },
          { label: 'Menunggu', value: listBooking.filter(x => x.status === 'Menunggu').length, color: '#fff7ed', ink: '#c2410c' },
          { label: 'Disetujui', value: listBooking.filter(x => x.status === 'Disetujui').length, color: '#ecfdf5', ink: '#15803d' }
        ].map(item => (
          <div key={item.label} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color, color: item.ink, display: 'grid', placeItems: 'center' }}><Calendar size={21}/></div>
            <div><div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{item.value}</div><div style={{ fontSize: 13, color: '#64748b' }}>{item.label}</div></div>
          </div>
        ))}
      </div>

      <div style={{ ...cardStyle, padding: 14, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Search size={19} color="#94a3b8"/>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kode booking, nama anak, atau orang tua..." style={{ border: 0, outline: 0, width: '100%', fontSize: 14, color: '#334155' }}/>
      </div>

      <div style={{ ...cardStyle, padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 850, borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead><tr style={{ background: '#f8fafc', color: '#64748b' }}>
            {['Kode Booking', 'Nama Anak', 'Orang Tua', 'Tanggal', 'Paket', 'Biaya', 'Status', 'Aksi'].map(label => <th key={label} style={{ padding: '15px 16px', whiteSpace: 'nowrap' }}>{label}</th>)}
          </tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan="8" style={{ padding: 35, textAlign: 'center', color: '#94a3b8' }}>Belum ada data booking.</td></tr> :
              filtered.map(item => (
                <tr key={item.id} style={{ borderTop: '1px solid #f1f5f9', color: '#475569' }}>
                  <td style={{ padding: '15px 16px', fontWeight: 700, color: '#277e70' }}>{item.id}</td>
                  <td style={{ padding: '15px 16px', fontWeight: 600, color: '#0f172a' }}>{item.nama_anak}</td>
                  <td style={{ padding: '15px 16px' }}>{item.nama_orang_tua || '-'}</td>
                  <td style={{ padding: '15px 16px' }}>{item.tanggal}</td>
                  <td style={{ padding: '15px 16px' }}>{item.paket}</td>
                  <td style={{ padding: '15px 16px', whiteSpace: 'nowrap' }}>Rp {Number(item.harga || 0).toLocaleString('id-ID')}</td>
                  <td style={{ padding: '15px 16px' }}>
                    <select value={item.status} onChange={e => updateStatus(item.id, e.target.value)} style={{ ...inputStyle, width: 130, padding: '8px 9px', color: item.status === 'Disetujui' ? '#15803d' : item.status === 'Ditolak' ? '#dc2626' : '#b45309', fontWeight: 600 }}>
                      <option>Menunggu</option><option>Disetujui</option><option>Ditolak</option>
                    </select>
                  </td>
                  <td style={{ padding: '15px 16px' }}>
                    <button onClick={() => deleteBooking(item.id)} title="Hapus booking" style={{ border: 0, background: '#fee2e2', color: '#dc2626', borderRadius: 8, padding: 8, cursor: 'pointer' }}><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {modalOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(15,23,42,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 18, padding: 26, width: 460, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 15px 40px rgba(0,0,0,.15)' }}>
          <div><h2 style={{ margin: 0, color: '#0f172a', fontSize: 20 }}>Buat Booking Baru</h2><p style={{ margin: '5px 0 0', color: '#64748b', fontSize: 13 }}>Pilih dari nama anak dummy yang sudah terdaftar.</p></div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Nama Anak
            <select required value={form.anak_id} onChange={e => setForm({ ...form, anak_id: e.target.value })} style={{ ...inputStyle, marginTop: 6 }}>
              {dataAnak.map(anak => <option key={anak.id} value={anak.id}>{anak.nama_lengkap}</option>)}
            </select>
          </label>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Tanggal Penitipan
            <input required type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })} style={{ ...inputStyle, marginTop: 6 }}/>
          </label>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Paket
            <select value={form.paket} onChange={e => setForm({ ...form, paket: e.target.value })} style={{ ...inputStyle, marginTop: 6 }}>
              {Object.keys(paketHarga).map(paket => <option key={paket}>{paket}</option>)}
            </select>
          </label>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Status
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ ...inputStyle, marginTop: 6 }}>
              <option>Menunggu</option><option>Disetujui</option><option>Ditolak</option>
            </select>
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9, marginTop: 6 }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '10px 16px', borderRadius: 9, border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
            <button type="submit" style={{ padding: '10px 18px', borderRadius: 9, border: 0, background: '#277e70', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Simpan Booking</button>
          </div>
        </form>
      </div>}
    </div>
  );
}

function Dashboard() {
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(''); 
  const [activeTab, setActiveTab] = useState('beranda');
  const [listRiwayat, setListRiwayat] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleAddBooking(newBooking) {
    setListRiwayat(prev => [newBooking, ...prev]);
    const orangTua = dataOrangTua.find(item => item.anak === newBooking.nama_anak);
    setListBooking(prev => [{
      ...newBooking,
      nama_orang_tua: orangTua?.nama_lengkap || '-',
      tanggal: newBooking.tanggal?.split(' - ')[0] || newBooking.tanggal
    }, ...prev]);
  }
  // ================= DATA DUMMY Pengasuh =================
const [dataPengasuh, setDataPengasuh] = useState([
    { id: 1, nama_pengasuh: 'Bu Rina', no_hp: '0811-2222-2222', status_aktif: 'Aktif', jadwal: '8 aktivitas' },
    { id: 2, nama_pengasuh: 'Bu Dewi', no_hp: '0812-1111-111x', status_aktif: 'Aktif', jadwal: '7 aktivitas' },
    { id: 3, nama_pengasuh: 'Pak Andi', no_hp: '0813-4444-2223', status_aktif: 'Aktif', jadwal: '5 aktivitas' },
    { id: 4, nama_pengasuh: 'Bu Maya', no_hp: '0857-3333-3333', status_aktif: 'Nonaktif', jadwal: '0 aktivitas' }
  ]);
  // ================= DATA DUMMY anak =================
  const [dataAnak, setDataAnak] = useState([
    { 
      id: 1, 
      nama_lengkap: 'Rima Azzahra Mahira', 
      nama_panggilan: 'Rima', 
      jenis_kelamin: 'Perempuan',
      golongan_darah: 'A',
      tanggal_lahir: '2020-05-12',
      catatan_khusus: '-'
    },
    { 
      id: 2, 
      nama_lengkap: 'Dzaky Asyam Alvaro', 
      nama_panggilan: 'Dzaky', 
      jenis_kelamin: 'Laki-laki',
      golongan_darah: 'B',
      tanggal_lahir: '2021-03-10',
      catatan_khusus: '-'
    }
  ]);
  const [listJadwal, setListJadwal] = useState([
    { id: 1, waktu: '07.30–08.30', nama_aktivitas: 'Penyambutan & Sarapan', pengasuh: 'Bu Rina', tanggal: '26 Okt 2026', keterangan: 'Sarapan bersama' },
    { id: 2, waktu: '08.30–10.00', nama_aktivitas: 'Circle Time & Bernyanyi', pengasuh: 'Bu Rina', tanggal: '26 Okt 2026', keterangan: 'Lagu & doa' },
    { id: 3, waktu: '10.00–11.30', nama_aktivitas: 'Bermain Balok & Kreasi', pengasuh: 'Bu Dewi', tanggal: '26 Okt 2026', keterangan: 'Menggambar bebas' },
    { id: 4, waktu: '11.30–13.30', nama_aktivitas: 'Makan & Tidur Siang', pengasuh: 'Pak Andi', tanggal: '26 Okt 2026', keterangan: 'Istirahat' },
    { id: 5, waktu: '13.30–15.00', nama_aktivitas: 'Bermain Luar Ruangan', pengasuh: 'Bu Dewi', tanggal: '26 Okt 2026', keterangan: 'Taman daycare' },
    { id: 6, waktu: '08.00–09.30', nama_aktivitas: 'Olahraga Pagi', pengasuh: 'Pak Andi', tanggal: '27 Okt 2026', keterangan: 'Senam sehat' }
  ]);
const [listKesehatan, setListKesehatan] = useState([
    { id: 1, anak_id: 2, nama_anak: 'Rima Azzahra Mahira', tanggal: '2026-10-20', bb: 32, tb: 138, suhu: 36.6, catatan: 'Sehat' },
    { id: 2, anak_id: 3, nama_anak: 'Dzaky Asyam Alvaro', tanggal: '2026-10-20', bb: 15, tb: 98, suhu: 36.8, catatan: 'Batuk ringan' },
    { id: 3, anak_id: 1, nama_anak: 'Aldis', tanggal: '2026-10-19', bb: 60, tb: 170, suhu: 37.9, catatan: 'Demam' }
  ]);
  const [dataOrangTua, setDataOrangTua] = useState([
    { id: 1, nama_lengkap: 'Bunda Rima', email: 'rima@gmail.com', telepon: '0812-3456-7890', anak: 'Rima Azzahra Mahira' },
    { id: 2, nama_lengkap: 'Ayah Dzaky', email: 'dzaky@gmail.com', telepon: '0813-9876-5432', anak: 'Dzaky Asyam Alvaro' }
  ]);

  const [listAbsensi, setListAbsensi] = useState([
    { id: 101, anak_id: 1, nama_anak: 'Rima Azzahra Mahira', masuk: '07.45', keluar: '—', status: 'Hadir' },
    { id: 102, anak_id: 2, nama_anak: 'Dzaky Asyam Alvaro', masuk: '07.55', keluar: '—', status: 'Hadir' }
  ]);

  const [verifikasiPembayaran, setVerifikasiPembayaran] = useState([
    { id: 1, nama: 'Rima Azzahra Mahira', tagihan: 'Tagihan Okt 2026', status: 'Pending' },
    { id: 2, nama: 'Dzaky Asyam Alvaro', tagihan: 'Tagihan Okt 2026', status: 'Pending' }
  ]);

  const [listBooking, setListBooking] = useState([
    { id: 'BK2026-001', nama_anak: 'Rima Azzahra Mahira', nama_orang_tua: 'Bunda Rima', tanggal: '2026-11-06', paket: 'Harian', harga: 100000, status: 'Menunggu' },
    { id: 'BK2026-002', nama_anak: 'Dzaky Asyam Alvaro', nama_orang_tua: 'Ayah Dzaky', tanggal: '2026-11-07', paket: 'Full Day', harga: 190000, status: 'Disetujui' }
  ]);

  const [daycarePhoto, setDaycarePhoto] = useState('/image/daycare.jpg');
  const [daycareLocation, setDaycareLocation] = useState('Jl. Melati No. 12, Batam');
  const [userPhoto, setUserPhoto] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => { 
    fetch('/api/auth/me', { credentials: 'include' })
      .then(async r => {
        const d = await r.json(); 
        if(!r.ok) throw new Error(d.message); 
        setUser(d.user);
      })
      .catch(e => {
        setError(e.message); 
        navigate('/login');
      }); 
  }, [navigate]);

  async function logout() { 
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); 
    navigate('/login'); 
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', color: '#64748b' }}>
        {error || 'Memuat dashboard...'}
      </div>
    );
  }

  const isAdminOrStaff = user?.peran === 'admin' || user?.peran === 'staf';

  // Menu Orang Tua
  const parentMenu = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'booking', label: 'Booking', icon: Calendar },
    { id: 'anaksaya', label: 'Anak Saya', icon: Smile },
    { id: 'kesehatananak', label: 'Kesehatan Anak', icon: Heart }, 
    { id: 'jadwalkerja', label: 'Jadwal & Kegiatan', icon: Clock },
    { id: 'absensi', label: 'Absensi Anak', icon: ClipboardCheck },
    { id: 'pembayaran', label: 'Pembayaran', icon: CreditCard },
    { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  // Menu Admin & Pengasuh
  const adminMenu = [
    { id: 'beranda', label: 'Dashboard Admin', icon: Home },
    { id: 'kelolananak', label: 'Data Anak', icon: Baby },
    { id: 'dataorangtua', label: 'Data Orang Tua', icon: Users },
    { id: 'bookingadmin', label: 'Booking Penitipan', icon: Calendar },
    { id: 'datapengasuh', label: 'Data Pengasuh', icon: Users },
    { id: 'kesehatan', label: 'Kesehatan Anak', icon: Heart }, 
    { id: 'jadwalkerja', label: 'Jadwal & Kegiatan', icon: Calendar },
    { id: 'absensi', label: 'Absensi Anak', icon: ClipboardCheck },
    { id: 'keuangan', label: 'Pembayaran', icon: CreditCard },
    { id: 'Pengaturan', label: 'Pengaturan', icon: User },
  ];

  const menuItems = isAdminOrStaff ? adminMenu : parentMenu;

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>
      <aside className={`dash-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`} style={{ 
        width: '260px', background: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', padding: '24px 16px',
        position: window.innerWidth <= 768 ? 'fixed' : 'sticky', top: 0, height: '100vh', zIndex: 1100,
        left: window.innerWidth <= 768 && !mobileMenuOpen ? '-260px' : '0', transition: 'left 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: isAdminOrStaff ? '#dcfce7' : '#e0f2fe', padding: '8px', borderRadius: '10px', color: isAdminOrStaff ? '#15803d' : '#0284c7' }}>
              <Home size={22}/>
            </div>
            <div>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', display: 'block' }}>Daycare Ceria</span>
              <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                {roleLabels[user?.peran] || 'Pengguna'}
              </span>
            </div>
          </div>
          {window.innerWidth <= 768 && (
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
          )}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px',
                  borderRadius: '12px', border: 'none', background: isActive ? (isAdminOrStaff ? '#f0fdf4' : '#eff6ff') : 'transparent',
                  color: isActive ? (isAdminOrStaff ? '#15803d' : '#2563eb') : '#64748b', fontWeight: isActive ? '600' : '500', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s'
                }}
              >
                <Icon size={18} /> {item.label}
              </button>
            );
          })}
        </nav>

        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', border: 'none', background: '#fef2f2', color: '#dc2626', fontWeight: '500', cursor: 'pointer', marginTop: 'auto' }}>
          <LogOut size={18} /> Keluar
        </button>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: '70px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              style={{ display: window.innerWidth <= 768 ? 'block' : 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              ☰
            </button>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
              Panel {isAdminOrStaff ? 'Admin & Pengasuh' : 'Orang Tua'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '6px 14px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isAdminOrStaff ? '#dcfce7' : '#fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {userPhoto ? <img src={userPhoto} alt="Profil" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/> : <UserRound size={18} color={isAdminOrStaff ? '#15803d' : '#c2410c'}/>}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{user?.nama_lengkap}</span>
          </div>
        </header>

        <main style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'anaksaya' ? (
            <AnakTab 
              isAdminOrStaff={isAdminOrStaff} 
              dataAnak={dataAnak}
              setDataAnak={setDataAnak}
              user={user}
            />
          ) : activeTab === 'kelolananak' && isAdminOrStaff ? (
            <AdminKelolaAnakTab 
              dataAnak={dataAnak} 
              setDataAnak={setDataAnak} 
              user={user} 
            />
          ) : activeTab === 'dataorangtua' && isAdminOrStaff ? (
            <AdminKelolaOrangTuaTab
              dataOrangTua={dataOrangTua} 
              setDataOrangTua={setDataOrangTua} 
            /> 
          ) : activeTab === 'bookingadmin' && isAdminOrStaff ? (
            <AdminBookingTab
              dataAnak={dataAnak}
              dataOrangTua={dataOrangTua}
              listBooking={listBooking}
              setListBooking={setListBooking}
            />
          ) : activeTab === 'jadwalkerja' ? (
            <JadwalKegiatanTab
              isAdminOrStaff={isAdminOrStaff}
              listJadwal={listJadwal}
              setListJadwal={setListJadwal}
            />
          ) : activeTab === 'absensi' ? (
            <AbsensiTab
              isAdminOrStaff={isAdminOrStaff}
              dataAnak={dataAnak}
              listAbsensi={listAbsensi}
              setListAbsensi={setListAbsensi}
            />
          ) : activeTab === 'booking' ? (
            <BookingTab 
              dataAnakSaya={dataAnak}
              onGoToAddAnak={() => setActiveTab('anaksaya')}
              onGoToBeranda={() => setActiveTab('beranda')}
              onAddBooking={handleAddBooking}
            />
          ) : activeTab === 'riwayat' ? (
            <RiwayatTab onNavigateUpload={() => setActiveTab('pembayaran')} 
            />
          ) : activeTab === 'pembayaran'  ? (
            <PembayaranTab 
              listRiwayat={listRiwayat} 
              dataAnakSaya={dataAnak} 
            />
            ) : activeTab === 'keuangan' ? (
            <KeuanganTab 
              listRiwayat={listRiwayat} 
              dataAnakSaya={dataAnak} 
            />
          ) : activeTab === 'notifikasi' ? (
            <NotifikasiTab 
              listRiwayat={listRiwayat} 
            />
          ) : activeTab === 'profil' ? (
            <ProfilTab
              user={user} 
              dataAnakSaya={dataAnak} 
              onNavigateTab={(tabId) => setActiveTab(tabId)} 
            />
            ) : activeTab === 'Pengaturan' ? (
            <ProfilDaycareTab
              user={user} 
              dataAnakSaya={dataAnak} 
              onNavigateTab={(tabId) => setActiveTab(tabId)} 
            />
            ) : activeTab === 'datapengasuh' && isAdminOrStaff ? (
            <AdminKelolaPengasuhTab 
      dataPengasuh={dataPengasuh} 
      setDataPengasuh={setDataPengasuh} 
            /> 
) : activeTab === 'kesehatan' ? (
            <KesehatanAnakTab 
      isAdminOrStaff={isAdminOrStaff}
      dataAnak={dataAnak}
      listKesehatan={listKesehatan}
      setListKesehatan={setListKesehatan}
      user={user}
            />
            ) : activeTab === 'kesehatananak' ? (
            <KesehatanAnakSayaTab 
      isAdminOrStaff={isAdminOrStaff}
      dataAnak={dataAnak}
      listKesehatan={listKesehatan}
      setListKesehatan={setListKesehatan}
      user={user}
            />
            ) : activeTab === 'adminbooking' && isAdminOrStaff ? (
            <AdminBookingTab
              listBooking={listBooking}
              setListBooking={setListBooking}
              dataAnak={dataAnak}
            />
          ) :
          
          
           isAdminOrStaff ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    
    {/* 4 CARDS KARTU STATISTIK */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <div style={{ background: '#f3e8ff', borderRadius: '18px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <Smile size={22} color="#9333ea" />
        </div>
        <div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#7e22ce', lineHeight: '1' }}>{dataAnak.length}</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#9333ea', marginTop: '4px' }}>Total Anak</div>
        </div>
      </div>

      <div style={{ background: '#dcfce7', borderRadius: '18px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <Users size={22} color="#16a34a" />
        </div>
        <div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#15803d', lineHeight: '1' }}>2</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a', marginTop: '4px' }}>Pengasuh Aktif</div>
        </div>
      </div>

      <div style={{ background: '#ffedd5', borderRadius: '18px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <Check size={22} color="#ea580c" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#c2410c', lineHeight: '1' }}>2</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#ea580c', marginTop: '4px' }}>Hadir Hari Ini</div>
        </div>
      </div>

      <div style={{ background: '#fef3c7', borderRadius: '18px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <CreditCard size={22} color="#d97706" />
        </div>
        <div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#b45309', lineHeight: '1' }}>2</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#d97706', marginTop: '4px' }}>Pembayaran Pending</div>
        </div>
      </div>
    </div>

    {/* GRID SEKSI ABSENSI & VERIFIKASI PEMBAYARAN */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
          Absensi Hari Ini
        </h3>
        <div style={{ border: '1px solid #f1f5f9', borderRadius: '14px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '12px', fontWeight: '600', borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ padding: '12px 16px' }}>Anak</th>
                <th style={{ padding: '12px 16px' }}>Masuk</th>
                <th style={{ padding: '12px 16px' }}>Keluar</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {listAbsensi.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>{row.nama_anak}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{row.masuk}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{row.keluar}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                      background: row.status === 'Hadir' ? '#dcfce7' : '#ffedd5',
                      color: row.status === 'Hadir' ? '#15803d' : '#c2410c'
                    }}>
                      • {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px 0' }}>
            Verifikasi Pembayaran
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {verifikasiPembayaran.map((item) => (
              <div key={item.id} style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>{item.nama}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{item.tagihan}</div>
                </div>
                <span style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                  background: '#fef3c7', color: '#b45309'
                }}>
                  • {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('keuangan')}
          style={{
            background: '#dcfce7', color: '#15803d', border: 'none', padding: '12px 18px',
            borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
            width: 'fit-content'
          }}
        >
          Buka Keuangan & Tagihan
        </button>
      </div>
    </div>

    {/* SEKSI BAWAH: JADWAL & AKTIVITAS HARI INI (DIKEMBALIKAN DI SINI) */}
    <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
          Jadwal & Aktivitas Hari Ini
        </h3>
        <button 
          onClick={() => setActiveTab('jadwalkerja')} 
          style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', color: '#277e70', cursor: 'pointer', padding: 0 }}
        >
          Kelola Semua Jadwal →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {listJadwal.slice(0, 5).map((j) => (
          <div key={j.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#277e70', background: '#e6f4ea', padding: '6px 10px', borderRadius: '8px' }}>
                {j.waktu || j.jam}
              </span>
              <div>
                <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: 'bold', display: 'block' }}>
                  {j.nama_aktivitas || j.kegiatan}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Pengasuh: {j.pengasuh || 'Bu Rina'} • {j.keterangan || '-'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
) : (
  // Tampilan Dashboard untuk Orang Tua
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
          🧒
        </div>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Halo, {user?.nama_lengkap}!</h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Selamat datang di sistem informasi Daycare</p>
        </div>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
      <div style={{ background: '#f3e8ff', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: '#d8b4fe', padding: '12px', borderRadius: '12px', color: '#7e22ce' }}><Smile size={24}/></div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#581c87' }}>{dataAnak.length}</div>
          <div style={{ fontSize: '13px', color: '#6b21a8', fontWeight: '500' }}>Anak Terdaftar</div>
        </div>
      </div>

      <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: '#86efac', padding: '12px', borderRadius: '12px', color: '#15803d' }}><Calendar size={24}/></div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#14532d' }}>0</div>
          <div style={{ fontSize: '13px', color: '#166534', fontWeight: '500' }}>Booking Aktif</div>
        </div>
      </div>

      <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: '#fde047', padding: '12px', borderRadius: '12px', color: '#a16207' }}><CreditCard size={24}/></div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#713f12' }}>0</div>
          <div style={{ fontSize: '13px', color: '#854d0e', fontWeight: '500' }}>Menunggu Pembayaran</div>
        </div>
      </div>
    </div>

    <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
          Jadwal & Aktivitas Hari Ini
        </h3>
        <button onClick={() => setActiveTab('jadwalkerja')} style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', color: '#277e70', cursor: 'pointer', padding: 0 }}>
          Lihat Semua Jadwal →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {listJadwal.slice(0, 4).map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={18} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#277e70', fontWeight: 'bold', display: 'block' }}>{item.waktu || item.jam}</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{item.nama_aktivitas || item.kegiatan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
        </main>
      </div>
    </div>
  );
}
// ================= KOMPONEN LANDING PAGE =================
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b', background: '#ffffff', minHeight: '100vh' }}>
      {/* NAVBAR */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '18px 48px', 
        borderBottom: '1px solid #f1f5f9',
        position: 'sticky',
        top: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 'bold', color: '#13392a' }}>
          <span className="brand-icon" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Menggunakan logo gambar dari folder public/image/ */}
        <img 
          src="/image/icon.png" 
          alt="Logo Daycare Ceria" 
          style={{ width: '50px', height: '32px', objectFit: 'contain' }} 
          onError={(e) => {
            // Fallback otomatis jika nama file logo berbeda
            e.target.style.display = 'none';
          }}
        />
      </span>
          <span>daycare Ceria<span style={{ color: '#277e70' }}>.</span></span>
        </div>

        <nav style={{ display: 'flex', gap: '28px', fontSize: '14px', fontWeight: '500', color: '#475569' }}>
          <a href="#tentang" style={{ textDecoration: 'none', color: 'inherit' }}>Tentang Kami</a>
          <a href="#layanan" style={{ textDecoration: 'none', color: 'inherit' }}>Layanan & Paket</a>
          <a href="#keunggulan" style={{ textDecoration: 'none', color: 'inherit' }}>Keunggulan</a>
          <a href="#kontak" style={{ textDecoration: 'none', color: 'inherit' }}>Kontak</a>
        </nav>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              background: 'transparent', 
              border: '1.5px solid #cbd5e1', 
              color: '#334155', 
              padding: '9px 20px', 
              borderRadius: '10px', 
              fontWeight: '600', 
              fontSize: '14px', 
              cursor: 'pointer' 
            }}
          >
            Masuk
          </button>
          <button 
            onClick={() => navigate('/register')}
            style={{ 
              background: '#277e70', 
              border: 'none', 
              color: '#fff', 
              padding: '9px 20px', 
              borderRadius: '10px', 
              fontWeight: '600', 
              fontSize: '14px', 
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(39, 126, 112, 0.25)' 
            }}
          >
            Daftar Orang Tua
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ 
        padding: '80px 48px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: '1.2fr 1fr', 
        gap: '48px', 
        alignItems: 'center' 
      }}>
        <div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: '#e6f4ea', 
            color: '#15803d', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '13px', 
            fontWeight: '600', 
            marginBottom: '20px' 
          }}>
            <Sparkles size={16} /> Ruang Aman & Tumbuh Bahagia Bagi Si Kecil 
          </div>
          <h1 style={{ fontSize: '46px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', margin: '0 0 20px 0' }}>
            Tempat Penitipan Anak Terpercaya & Terpantau Real-Time.
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', margin: '0 0 32px 0' }}>
            Daycare Ceria menghadirkan lingkungan pengasuhan yang aman, edukatif, dan penuh kasih sayang. Dilengkapi dengan sistem informasi absensi, kesehatan, serta pemesanan booking transparan bagi orang tua.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{ 
                background: '#277e70', 
                color: '#fff', 
                border: 'none', 
                padding: '14px 28px', 
                borderRadius: '12px', 
                fontWeight: '700', 
                fontSize: '15px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(39, 126, 112, 0.3)'
              }}
            >
              Masuk ke Aplikasi <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/register')}
              style={{ 
                background: '#f8fafc', 
                color: '#334155', 
                border: '1px solid #cbd5e1', 
                padding: '14px 24px', 
                borderRadius: '12px', 
                fontWeight: '600', 
                fontSize: '15px', 
                cursor: 'pointer' 
              }}
            >
              Daftar Akun Baru
            </button>
          </div>
        </div>

        {/* HERO IMAGE CARD */}
        <div style={{ position: 'relative' }}>
          <div style={{ 
            background: '#e6f4ea', 
            borderRadius: '28px', 
            padding: '24px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #dcfce7'
          }}>
            <img 
              src="/image/daycare.jpg" 
              alt="Daycare Ceria" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.height = '320px';
                e.target.parentNode.style.display = 'flex';
                e.target.parentNode.style.alignItems = 'center';
                e.target.parentNode.style.justifyContent = 'center';
              }}
              style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '20px' }} 
            />
            <div style={{ padding: '16px 8px 4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#13392a', display: 'block' }}>Daycare Ceria Batam</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Buka Setiap Hari Kerja (07.00 - 17.00 WIB)</span>
              </div>
              <span style={{ background: '#277e70', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                ★ 4.9 (120+ Ulasan)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN SECTION */}
      <section id="keunggulan" style={{ background: '#f8fafc', padding: '70px 48px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0' }}>
            Mengapa Memilih Daycare Ceria?
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
            Fasilitas lengkap dan sistem pemantauan terpadu untuk kenyamanan Anda dan si kecil.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0f172a' }}>Pengawasan Aman & Lingkungan Bersih</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>Ruangan ber-AC, diawasi pengasuh berpengalaman, serta rutin disterilisasi setiap hari.</p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Activity size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0f172a' }}>Laporan Kesehatan & Absensi</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>Pantau suhu tubuh, berat/tinggi badan, serta absensi masuk/keluar anak langsung dari aplikasi.</p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0f172a' }}>Booking Mudah & Fleksibel</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>Reservasi paket harian, full day, maupun mingguan secara praktis lewat akun orang tua.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN & PAKET SECTION */}
      <section id="layanan" style={{ padding: '70px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0' }}>
            Paket Layanan Penitipan
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Pilih paket yang sesuai dengan kebutuhan aktivitas keluarga Anda.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {/* PAKET 1 */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#277e70', background: '#e6f4ea', padding: '4px 12px', borderRadius: '12px' }}>Harian</span>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '16px 0 8px 0', color: '#0f172a' }}>Rp 100.000 <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>/ hari</span></h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Penitipan standar (08.00 - 16.00 WIB)</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>✓ Sarapan & makan siang</li>
                <li>✓ Circle time & edukasi dasar</li>
                <li>✓ Laporan harian</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '28px', background: '#f1f5f9', border: 'none', color: '#0f172a', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Pilih Paket</button>
          </div>

          {/* PAKET 2 (HIGHLIGHT) */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '2px solid #277e70', boxShadow: '0 10px 25px rgba(39, 126, 112, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-14px', right: '24px', background: '#277e70', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '4px 14px', borderRadius: '20px' }}>POPULER</span>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#277e70', background: '#e6f4ea', padding: '4px 12px', borderRadius: '12px' }}>Full Day</span>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '16px 0 8px 0', color: '#0f172a' }}>Rp 190.000 <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>/ hari</span></h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Penitipan seharian penuh + aktivitas ekstra</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>✓ Makan 3 kali + snack sore</li>
                <li>✓ Bermain luar ruang & olahraga</li>
                <li>✓ Mandi sore & bimbingan tidur</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '28px', background: '#277e70', border: 'none', color: '#fff', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Pilih Paket</button>
          </div>

          {/* PAKET 3 */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#277e70', background: '#e6f4ea', padding: '4px 12px', borderRadius: '12px' }}>Paket Mingguan</span>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '16px 0 8px 0', color: '#0f172a' }}>Rp 450.000 <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>/ 5 hari</span></h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Hemat untuk Senin s.d. Jumat</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>✓ Bebas pilih jam antar-jemput</li>
                <li>✓ Prioritas kuota tempat</li>
                <li>✓ Pemeriksaan kesehatan mingguan</li>
              </ul>
            </div>
            <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '28px', background: '#f1f5f9', border: 'none', color: '#0f172a', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Pilih Paket</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" style={{ background: '#0f172a', color: '#94a3b8', padding: '48px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>
              <Flower2 size={22} color="#277e70" /> Daycare Ceria
            </div>
            <p style={{ fontSize: '13px', maxWidth: '300px', lineHeight: '1.5' }}>
              Jl. Melati No. 12, Batam, Kepulauan Riau.<br/> Telepon: (0778) 456-789
            </p>
          </div>
          <div style={{ fontSize: '13px' }}>
            <p style={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>Navigasi Sistem</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>Login Orang Tua / Admin</Link>
              <Link to="/register" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pendaftaran Akun Baru</Link>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #1e293b', fontSize: '12px' }}>
          © 2026 Daycare Ceria.
        </div>
      </footer>
    </div>
  );
}
// Tambahkan Route Landing Page pada App Router:
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}
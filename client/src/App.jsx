import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { 
  Flower2, ArrowUpRight, ShieldCheck, Eye, EyeOff, Sun, LogOut, 
  Baby, Users, Sparkles, Mail, LockKeyhole, UserRound, Phone, Leaf,
  Home, Calendar, Smile, Clock, CreditCard, Bell, User, MapPin, Camera, ChevronDown, Plus, Search, AlertCircle, Heart, Edit3, Trash2 
} from 'lucide-react';

const roleLabels = { 
  orangtua: 'Orang Tua', 
  admin: 'Admin & Pengasuh', 
  staf: 'Admin & Pengasuh' 
};

function Brand() {
  return (
    <div className="brand">
      <span className="brand-icon">
        <Flower2 size={24} fill="#277e70" strokeWidth={2.7}/>
      </span>
      <span>daycare<span className="brand-dot">.</span></span>
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
  const [role, setRole] = useState('orangtua');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault(); 
    setError(''); 
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ identifier, password, role })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server merespons bukan dalam format JSON.");
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login gagal.');
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
          <p className="subtitle">Silakan login untuk melanjutkan</p>

          <div className="role-switch" aria-label="Pilih peran">
            <button 
              type="button" 
              className={role === 'orangtua' ? 'active' : ''} 
              onClick={() => { setRole('orangtua'); setError(''); }}
            >
              <UserRound size={13}/> Orang Tua
            </button>
            <button 
              type="button" 
              className={role !== 'orangtua' ? 'active' : ''} 
              onClick={() => { setRole('admin'); setError(''); }}
            >
              <Users size={13}/> Admin &amp; Pengasuh
            </button>
          </div>

          <form onSubmit={submit}>
            <label htmlFor="identifier">Email atau username</label>
            <div className="input-wrap">
              <Mail size={17}/>
              <input 
                id="identifier" 
                value={identifier} 
                onChange={e => setIdentifier(e.target.value)} 
                placeholder="nama@email.com" 
                autoComplete="username" 
                required 
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <LockKeyhole size={17}/>
              <input 
                id="password" 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Minimal 8 karakter" 
                autoComplete="current-password" 
                required 
                minLength={8}
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

            {error && <div className="error-message" role="alert">{error}</div>}

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

// ================= KOMPONEN TAB DATA ANAK =================
function AnakTab({ isAdminOrStaff, onDataChange }) {
  const [dataAnak, setDataAnak] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [listOrangTua, setListOrangTua] = useState([]);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    orangtua_id: '',
    nama_lengkap: '',
    nama_panggilan: '',
    jenis_kelamin: 'L',
    tanggal_lahir: '',
    golongan_darah: 'TIDAK_DIKETAHUI',
    catatan_khusus: ''
  });

  useEffect(() => {
    fetchAnak();
    if (isAdminOrStaff) {
      fetchOrangTua();
    }
  }, [isAdminOrStaff]);

  async function fetchAnak() {
    try {
      const res = await fetch('/api/anak', { credentials: 'include' });
      const result = await res.json();
      if (res.ok) setDataAnak(result.data || []);
    } catch (err) {
      console.error('Gagal memuat data anak');
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrangTua() {
    try {
      const res = await fetch('/api/anak/orangtua-list', { credentials: 'include' });
      const result = await res.json();
      if (res.ok) setListOrangTua(result.data || []);
    } catch (err) {
      console.error('Gagal memuat daftar orang tua');
    }
  }

  function handleOpenAdd() {
    setEditMode(false);
    setCurrentId(null);
    setForm({
      orangtua_id: '',
      nama_lengkap: '',
      nama_panggilan: '',
      jenis_kelamin: 'L',
      tanggal_lahir: '',
      golongan_darah: 'TIDAK_DIKETAHUI',
      catatan_khusus: ''
    });
    setFormError('');
    setModalOpen(true);
  }

  function handleOpenEdit(anak) {
    setEditMode(true);
    setCurrentId(anak.id);
    setForm({
      orangtua_id: anak.orangtua_id || '',
      nama_lengkap: anak.nama_lengkap || '',
      nama_panggilan: anak.nama_panggilan || '',
      jenis_kelamin: anak.jenis_kelamin || 'L',
      tanggal_lahir: anak.tanggal_lahir ? anak.tanggal_lahir.substring(0, 10) : '',
      golongan_darah: anak.golongan_darah || 'TIDAK_DIKETAHUI',
      catatan_khusus: anak.catatan_khusus || ''
    });
    setFormError('');
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      const url = editMode ? `/api/anak/${currentId}` : '/api/anak';
      const method = editMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || 'Gagal menyimpan data anak');
      
      setModalOpen(false);
      fetchAnak();
      if (onDataChange) onDataChange(); // Panggil fungsi refresh statistik
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data anak ini?')) return;
    try {
      const res = await fetch(`/api/anak/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || 'Gagal menghapus data anak');
      fetchAnak();
      if (onDataChange) onDataChange(); // Panggil fungsi refresh statistik
    } catch (err) {
      alert(err.message);
    }
  }

  const filteredAnak = dataAnak.filter(item => 
    item.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
    item.nama_panggilan?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
            {isAdminOrStaff ? 'Pengelolaan Data Anak Asuh' : 'Daftar Anak Saya'}
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
            Informasi profil, kesehatan, dan catatan khusus anak di daycare.
          </p>
        </div>
        {isAdminOrStaff && (
          <button 
            onClick={handleOpenAdd}
            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <Plus size={18} /> Tambah Anak
          </button>
        )}
      </div>

      {/* Kotak Pencarian */}
      <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search size={18} color="#64748b" />
        <input 
          type="text" 
          placeholder="Cari nama anak..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
        />
      </div>

      {/* Grid Data Anak */}
      {loading ? (
        <p style={{ color: '#64748b' }}>Memuat data anak...</p>
      ) : filteredAnak.length === 0 ? (
        <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
          <Baby size={48} style={{ opacity: 0.3, marginBottom: '10px' }} />
          <p>Belum ada data anak yang ditemukan.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredAnak.map((anak) => (
            <div key={anak.id} style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                      {anak.nama_lengkap.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>{anak.nama_lengkap}</h3>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Panggilan: {anak.nama_panggilan || '-'}</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#0284c7" /> Lahir: {anak.tanggal_lahir?.substring(0, 10)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Baby size={14} color="#16a34a" /> Kelamin: {anak.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Heart size={14} color="#dc2626" /> Gol. Darah: {anak.golongan_darah}
                  </div>
                  {isAdminOrStaff && (
                    <div style={{ fontSize: '12px', color: '#0f766e', background: '#f0fdf4', padding: '4px 8px', borderRadius: '6px', marginTop: '4px' }}>
                      Orang Tua: <b>{anak.nama_orangtua || `ID ${anak.orangtua_id}`}</b>
                    </div>
                  )}
                  {anak.catatan_khusus && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', background: '#fef2f2', padding: '6px 8px', borderRadius: '6px', marginTop: '6px' }}>
                      <AlertCircle size={14} /> Catatan: {anak.catatan_khusus}
                    </div>
                  )}
                </div>
              </div>

              {isAdminOrStaff && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <button 
                    onClick={() => handleOpenEdit(anak)}
                    style={{ flex: 1, background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    <Edit3 size={14} color="#0284c7" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(anak.id)}
                    style={{ flex: 1, background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODAL TAMBAH / EDIT ANAK */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', width: '420px', maxWidth: '90%' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
              {editMode ? 'Edit Data Anak Asuh' : 'Tambah Data Anak Asuh'}
            </h3>
            
            {formError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', marginBottom: '12px' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Pilih Orang Tua</label>
                <select 
                  value={form.orangtua_id} 
                  onChange={e => setForm({...form, orangtua_id: e.target.value})} 
                  required 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px', background: '#fff' }}
                >
                  <option value="">-- Pilih Orang Tua --</option>
                  {listOrangTua.map((ot) => (
                    <option key={ot.id} value={ot.id}>
                      {ot.nama_lengkap} ({ot.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Nama Lengkap Anak</label>
                <input 
                  value={form.nama_lengkap} 
                  onChange={e => setForm({...form, nama_lengkap: e.target.value})} 
                  placeholder="Nama lengkap anak"
                  required 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Nama Panggilan</label>
                <input 
                  value={form.nama_panggilan} 
                  onChange={e => setForm({...form, nama_panggilan: e.target.value})} 
                  placeholder="Nama panggilan (opsional)"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Jenis Kelamin</label>
                  <select 
                    value={form.jenis_kelamin} 
                    onChange={e => setForm({...form, jenis_kelamin: e.target.value})}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px', background: '#fff' }}
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Gol. Darah</label>
                  <select 
                    value={form.golongan_darah} 
                    onChange={e => setForm({...form, golongan_darah: e.target.value})}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px', background: '#fff' }}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                    <option value="TIDAK_DIKETAHUI">Tidak Diketahui</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Tanggal Lahir</label>
                <input 
                  type="date" 
                  value={form.tanggal_lahir} 
                  onChange={e => setForm({...form, tanggal_lahir: e.target.value})} 
                  required 
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Catatan Khusus / Alergi</label>
                <textarea 
                  rows={3}
                  value={form.catatan_khusus} 
                  onChange={e => setForm({...form, catatan_khusus: e.target.value})} 
                  placeholder="Contoh: Alergi kacang, riwayat asma, dll."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'pointer' }}>
                  Batal
                </button>
                <button type="submit" disabled={submitting} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#16a34a', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                  {submitting ? 'Menyimpan...' : (editMode ? 'Perbarui' : 'Simpan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(''); 
  const [activeTab, setActiveTab] = useState('beranda');
  
  // STATISTIK DINAMIS DARI DATABASE
  const [stats, setStats] = useState({ totalAnak: 0, totalOrangTua: 0, totalAnakSaya: 0 });

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
        fetchStats(); // Ambil statistik setelah user terverifikasi
      })
      .catch(e => {
        setError(e.message); 
        navigate('/login');
      }); 
  }, [navigate]);

  async function fetchStats() {
    try {
      const res = await fetch('/api/anak/stats', { credentials: 'include' });
      const data = await res.json();
      if (res.ok) setStats(data);
    } catch (err) {
      console.error('Gagal memuat data statistik');
    }
  }

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

  const parentMenu = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'booking', label: 'Booking', icon: Calendar },
    { id: 'anaksaya', label: 'Anak Saya', icon: Smile },
    { id: 'riwayat', label: 'Riwayat', icon: Clock },
    { id: 'pembayaran', label: 'Pembayaran', icon: CreditCard },
    { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  const adminMenu = [
    { id: 'beranda', label: 'Dashboard Admin', icon: Home },
    { id: 'kelolananak', label: 'Data Anak', icon: Baby },
    { id: 'kelolapengguna', label: 'Data Pengguna', icon: Users },
    { id: 'absensi', label: 'Absensi & Kegiatan', icon: Calendar },
    { id: 'keuangan', label: 'Keuangan & Tagihan', icon: CreditCard },
    { id: 'profil', label: 'Profil Admin', icon: User },
  ];

  const menuItems = isAdminOrStaff ? adminMenu : parentMenu;

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SIDEBAR */}
      <aside className="dash-sidebar" style={{ width: '260px', background: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ background: isAdminOrStaff ? '#dcfce7' : '#e0f2fe', padding: '8px', borderRadius: '10px', color: isAdminOrStaff ? '#15803d' : '#0284c7' }}>
            <Home size={22}/>
          </div>
          <div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', display: 'block' }}>Daycare</span>
            <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
              {roleLabels[user?.peran] || 'Pengguna'}
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* TOPNAV */}
        <header style={{ height: '70px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
            Panel {isAdminOrStaff ? 'Admin & Pengasuh' : 'Orang Tua'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '6px 14px', borderRadius: '30px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isAdminOrStaff ? '#dcfce7' : '#fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {userPhoto ? <img src={userPhoto} alt="Profil" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/> : <UserRound size={18} color={isAdminOrStaff ? '#15803d' : '#c2410c'}/>}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{user?.nama_lengkap}</span>
            <ChevronDown size={14} color="#64748b" />
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <main style={{ padding: '32px', overflowY: 'auto' }}>
          
          {activeTab === 'kelolananak' || activeTab === 'anaksaya' ? (
            <AnakTab isAdminOrStaff={isAdminOrStaff} onDataChange={fetchStats} />
          ) : isAdminOrStaff ? (
            /* ================= DASHBOARD ADMIN & STAFF ================= */
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Dashboard Admin &amp; Pengasuh</h1>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Kelola operasional harian daycare, anak, dan absensi di sini.</p>
              </div>

              {/* STATISTIK DENGAN DATA DARI DATABASE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #dcfce7' }}>
                  <div style={{ background: '#bbf7d0', padding: '12px', borderRadius: '12px', color: '#15803d' }}><Baby size={24}/></div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#14532d' }}>{stats.totalAnak}</div>
                    <div style={{ fontSize: '13px', color: '#166534', fontWeight: '500' }}>Total Anak Asuh</div>
                  </div>
                </div>

                <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #bfdbfe' }}>
                  <div style={{ background: '#93c5fd', padding: '12px', borderRadius: '12px', color: '#1d4ed8' }}><Users size={24}/></div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>{stats.totalOrangTua}</div>
                    <div style={{ fontSize: '13px', color: '#1e40af', fontWeight: '500' }}>Orang Tua Terdaftar</div>
                  </div>
                </div>

                <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #fecaca' }}>
                  <div style={{ background: '#fca5a5', padding: '12px', borderRadius: '12px', color: '#b91c1c' }}><CreditCard size={24}/></div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7f1d1d' }}>0</div>
                    <div style={{ fontSize: '13px', color: '#991b1b', fontWeight: '500' }}>Konfirmasi Pembayaran</div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Akses Cepat Pengelolaan</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={() => setActiveTab('kelolananak')} style={{ background: '#16a34a', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                    + Kelola Data Anak
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ================= DASHBOARD ORANG TUA ================= */
            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                    🧒
                  </div>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Halo, {user?.nama_lengkap}!</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Selamat datang di sistem informasi Daycare</p>
                  </div>
                </div>
              </div>

              {/* STATISTIK DENGAN DATA DARI DATABASE (ORANG TUA) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#f3e8ff', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#d8b4fe', padding: '12px', borderRadius: '12px', color: '#7e22ce' }}><Smile size={24}/></div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#581c87' }}>{stats.totalAnakSaya}</div>
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

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Informasi Daycare</h3>
                  </div>
                  <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', background: '#e2e8f0' }}>
                    <img src={daycarePhoto} alt="Daycare Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 4px 0' }}>Daycare Ceria</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 16px 0' }}>
                    <MapPin size={14} color="#0284c7" /> {daycareLocation}
                  </p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>
  );
}
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.cookies?.daycare_token ||
    (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Silakan login terlebih dahulu.' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.clearCookie('daycare_token');
    return res.status(401).json({ message: 'Sesi berakhir. Silakan login kembali.' });
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    // Mendukung pengecekan req.user.peran ATAU req.user.role
    const userRole = req.user?.peran || req.user?.role;
    if (!req.user || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Anda tidak memiliki akses ke halaman ini.' });
    }
    next();
  };
}

module.exports = { authenticate, allowRoles };
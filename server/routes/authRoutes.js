const router = require('express').Router();
const controller = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const childRoutes = require('../routes/childRoutes'); 

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/me', authenticate, controller.me);
router.post('/logout', controller.logout);

router.use('/api/anak', childRoutes);

module.exports = router;
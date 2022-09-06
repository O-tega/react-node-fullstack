const { register, login } = require('../controllers/authController');
const { getMe } = require('../middlewares/auth');

const router = require('express').Router();

const { protect } = require('../middlewares/auth')


router.post('/register', register )

router.post('/login', login )

router.get('/me', protect, getMe);

module.exports = router;
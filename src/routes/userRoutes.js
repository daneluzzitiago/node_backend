const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.get('/info', userController.getUserInfo);
router.post('/login', userController.startLogin);

module.exports = router;
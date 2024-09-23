import { Router } from 'express';
import { getUsers, addUser, getUserInfo, startLogin } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);
router.get('/info', getUserInfo);
router.post('/login', startLogin);

export default router;
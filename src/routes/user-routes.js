import express from 'express'
import {signup, login, updateProfile,logout} from '../controllers/user-contorller.js'
import isAuthenticated from '../middlewares/user-auth.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/profile/update', isAuthenticated , updateProfile);
router.get('/logout',logout);

export default router;



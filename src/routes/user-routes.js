import express from 'express'
import {signup, login, logout} from '../controllers/user-contorller.js'

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/profile/update', isAuthenticated , updateProfile);



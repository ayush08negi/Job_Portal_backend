import express from 'express'
import isAutenticated from '../middlewares/user-auth.js'
import { applyJob,get,getApplicant,updateStatus } from '../controllers/application-controller.js';
const router = express.Router();

router.get('/apply/:id',isAutenticated,applyJob);
router.get('/get',isAutenticated,get);
router.get('/:id/applicants',isAutenticated,getApplicant)
router.post('/status/:id/update',isAutenticated, updateStatus);


export default router;
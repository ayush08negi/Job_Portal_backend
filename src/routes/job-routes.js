import express from 'express'
import isAutenticated from '../middlewares/user-auth.js'
import {create_job , getJobById,getAdminJobs,getAllJobs} from '../controllers/job-controller.js'

const router = express.Router();

router.post('/post',isAutenticated,create_job);
router.get('/get',isAutenticated,getAllJobs);
router.get('/getadminjobs',isAutenticated,getAdminJobs)
router.get('/get/:id',isAutenticated, getJobById);


export default router;
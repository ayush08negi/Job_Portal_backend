import express from 'express'
import isAutenticated from '../middlewares/user-auth.js'
import { registerCompany ,getCompany, getCompanyById, updateCompany} from '../controllers/company-controller.js'

const router = express.Router();

router.post('/register',isAutenticated,registerCompany);
router.get('/get',isAutenticated,getCompany);
router.get('/get/:id',isAutenticated,getCompanyById)
router.put('/update/:id',isAutenticated, updateCompany);


export default router;
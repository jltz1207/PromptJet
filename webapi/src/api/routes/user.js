import express from 'express';
import Users from '../../models/user.js';
import userController from '../controllers/userController.js'
import auth from '../../middleware/auth.js';
const router = express.Router();

router.get('/',auth.authenticate, userController.getAllUsers)

router.post('/login',userController.login)

router.post('/register', userController.register)

router.post('/logout', userController.logout)

export default router
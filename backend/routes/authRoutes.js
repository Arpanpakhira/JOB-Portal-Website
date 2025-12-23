import express from 'express'
import { loginController, registerController } from '../controller/authController.js'

// Router Object
const router = express.Router();

// POST signup
// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

export default router;

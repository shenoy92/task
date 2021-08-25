import express from 'express'

import {login, registration, profileDetails } from '../controllers/user.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/login',login)
router.post('/registration',registration)
router.get('/', auth, profileDetails);

export default router;
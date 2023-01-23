/* eslint-disable import/extensions */
import express from 'express';
import { verifyrefreshToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/token', verifyrefreshToken);

const refresh = router;
export default refresh;

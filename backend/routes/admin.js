/* eslint-disable import/extensions */
// /* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import path from 'path';

import { register, userLogin, logout } from '../controllers/auth.js';

const router = express.Router();

// handle upload issues
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage });

router.post('/register', upload.none(), register);

// user login
router.post('/login', upload.none(), userLogin);

// handle user logout
router.get('/logout', logout);

const Router = router;
export default userRouter;

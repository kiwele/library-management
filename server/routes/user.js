/* eslint-disable import/extensions */
// /* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import path from 'path';

import { register, userLogin, logout } from '../controllers/auth.js';
import { AddBook, comentBook, deleteBook, deleteUser, editBook, editUser, likeBook, markFavoriteBook, unmarkFavoriteBook, viewAllBook, viewBook, viewUser } from '../controllers/user.js';
import { verifyaccessToken } from '../middlewares/auth.js';

const router = express.Router();

// handle upload issues
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
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

// admin add book
router.post('/add_book', upload.single('file'), AddBook).get('/books', viewAllBook);

// delete book
router.post('/delete_book/:id', deleteBook);
// view book
router.get('/view_book/:id', viewBook);

// view user
router.get('/view_user/:id', viewUser);
// edit user
router.post('/edit_user/:id', editUser);

// delete user
router.post('/delete_user/:id', deleteUser);

// like book
router.post('/like/:bookId', verifyaccessToken, likeBook);

// comment book
router.post('/coment/:bookId', upload.none(), verifyaccessToken, comentBook);

// mark book
router.post('/mark/:bookId', verifyaccessToken, markFavoriteBook);

// unmark book
router.post('/unmark/:bookId', verifyaccessToken, unmarkFavoriteBook);

// handle user logout
router.get('/logout', logout);

const userRouter = router;
export default userRouter;

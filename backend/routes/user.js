/* eslint-disable import/extensions */
// /* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import path from 'path';

import { register, userLogin, logout } from '../controllers/auth.js';
import { AddBook, comentBook, deleteBook, deleteUser, editBook, editUser, getFavoriteBooks, getUsers, likeBook, markFavoriteBook, popularBooks, unmarkFavoriteBook, viewAllBook, viewBook, viewUser } from '../controllers/user.js';
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
router.get('/favorites', verifyaccessToken, getFavoriteBooks);

// delete book
router.delete('/delete_book/:id', deleteBook);
// edit book
router.put('/edit_book/:id', editBook);
// view book
router.get('/view_book/:id', viewBook);

router.get('/users', getUsers);
router.delete('/delete_user/:id', deleteUser);
// view user
router.get('/view_user/:id', viewUser);
// edit user
router.post('/edit_user/:id', editUser);

// delete user
router.post('/delete_user/:id', deleteUser);

// like book
router.get('/like/:bookId', verifyaccessToken, likeBook);

// comment book
router.post('/coment/:bookId', upload.none(), verifyaccessToken, comentBook);

// mark book
router.get('/mark/:bookId', verifyaccessToken, markFavoriteBook);

// unmark book
router.get('/unmark/:bookId', verifyaccessToken, unmarkFavoriteBook);

router.get('/popularBooks', popularBooks);

// handle user logout
router.get('/logout', logout);

const userRouter = router;
export default userRouter;

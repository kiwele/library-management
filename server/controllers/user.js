/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
// import Jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import db from '../database.js';

const { User } = db.user;
const { books } = db.books;
const { like } = db.likes;
const { comments } = db.comments;
const { favouriteBooks } = db.favouriteBooks;

// admin add book
const AddBook = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const bookDetails = {
    bookName: req.body.bookName,
    Description: req.body.Description,
    picture: req.file.filename,
  };
  console.log(bookDetails);

  try {
    books.create(bookDetails);
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
};

// admin edit
const editBook = async (req, res) => {
  const bookDetails = {
    bookName: req.body.bookName,
    picture: req.file.fileName,
  };

  try {
    await books.update(bookDetails, {
      where: { bookId: req.params.id },
    });
  } catch (error) {
    throw error;
  }
};

// admin delete book
const deleteBook = async (req, res) => {
  try {
    await books.destroy({
      where: {
        book_id: req.params.id,
      },
    });
    res.status(200).json({ message: 'book successifully deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
};

// view book
const viewBook = async (req, res) => {
  try {
    const bookFound = await books.findOne({
      where: { book_id: req.params.id },
    });

    res.status(200).json(bookFound);
  } catch (error) {
    throw error;
  }
};

// get all books
const viewAllBook = async (req, res) => {
  try {
    const booksFound = await books.findAll();
    res.status(200).json(booksFound);
  } catch (error) {
    throw error;
  }
};

// admin view user
const viewUser = async (req, res) => {
  try {
    const userFound = await User.findOne({
      where: { userId: req.params.id },
    });

    res.status(200).json(userFound);
  } catch (error) {
    throw error;
  }
};

// admin edit user
const editUser = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      const userDetails = {
        first_name: req.body.fname,
        last_name: req.body.lname,
        user_name: req.body.user_name,
        password: hash,
      };

      await User.update(userDetails, {
        where: { userId: req.params.id },
      });
      res.status(204).json({ message: 'successifully updated' });
    });
  } catch (error) {
    throw error;
  }
};

// admin delete user
const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json({ message: 'user successifully deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
};

// user like book
const likeBook = async (req, res) => {
  const likeDetails = {
    bookId: req.params.id,
    userId: req.userDetails.id,
  };

  try {
    await like.create(likeDetails);
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
};

// user comment book
const comentBook = async (req, res) => {
  const comentDetails = {
    comment: req.body.coment,
    bookId: req.params.id,
    userId: req.userDetails.id,
  };

  try {
    await comments.create(comentDetails);
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
};

// user mark favorite book
const markFavoriteBook = async (req, res) => {
  console.log(req.params);
  const favDetails = {
    bookId: req.params.bookId,
    userId: req.userDetails.id,
  };

  try {
    await favouriteBooks.create(favDetails);
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
};

// user unmark favourite book
const unmarkFavoriteBook = async (req, res) => {
  try {
    await favouriteBooks.destroy(
      {
        where: {
          [Op.and]: [
            { bookId: req.params.bookId },
            { userId: req.userDetails.id },
          ],
        },
      },
    );
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
};

const popularBooks = async (req, res) => {
  try {
    const Likes = await like.findAll();
    console.log(likes);
    // popular = findPopular(Likes, )

    // res.status(200).json(booksFound);
  } catch (error) {
    throw error;
  }
};

function findPopular(arr, e) {
  return arr.filter((currentElement) => currentElement === e).length;
}

export {
  AddBook,
  editBook,
  deleteBook,
  viewBook,
  viewAllBook,
  viewUser,
  editUser,
  deleteUser,
  likeBook,
  comentBook,
  markFavoriteBook,
  unmarkFavoriteBook,
  popularBooks,
};

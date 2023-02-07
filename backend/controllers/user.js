/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import db from '../database.js';

const { User } = db.user;
const { books } = db.books;
const { like } = db.likes;
const { comments } = db.comments;
const { favouriteBooks } = db.favouriteBooks;

// admin add book
const AddBook = async (req, res) => {
  const bookDetails = {
    bookName: req.body.bookName,
    Description: req.body.Description,
    picture: req.file.filename,
  };

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
  console.log(req.headers);
  try {
    await books.destroy({
      where: {
        book_id: req.params.id,
      },
    });
    // console.log(deletedBook, 'here');
    res
      .status(200)
      .json({ message: 'book is successifully deleted', id: req.params.id });
  } catch (error) {
    res.sendStatus(500);
  }
};

// user like book
const likeBook = async (req, res) => {
  console.log(req.params.bookId);
  const likeDetails = {
    bookId: req.params.bookId,
    userId: req.userDetails.id,
  };

  try {
    await like.create(likeDetails);
    res.sendStatus(200);
  } catch (error) {
    throw error;
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
    console.log(req.headers);
    const booksFound = await books.findAll();
    res.status(200).json(booksFound);
  } catch (error) {
    throw error;
  }
};

// get all popular books
const getPopulaBooks = async (req, res) => {
  try {
    console.log(req.headers);
    const booksFound = await books.findAll();
    res.status(200).json(booksFound);
  } catch (error) {
    throw error;
  }
};

// get all my favority books
const getFavoriteBooks = async (req, res) => {
  console.log('here');
  try {
    const booksFound = await favouriteBooks.findAll({
      where: { userId: req.userDetails.id },
      include: {
        model: books,
      },
    });
    console.log(booksFound);
    res.status(200).json(booksFound);
  } catch (error) {
    throw error;
  }
};

// admin view user
const getUsers = async (req, res) => {
  try {
    const usersFound = await User.findAll();
    res.status(200).json(usersFound);
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

// user comment book
const comentBook = async (req, res) => {
  const comentDetails = {
    comment: req.body.coment,
    bookId: req.params.bookId,
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
    await favouriteBooks.destroy({
      where: {
        [Op.and]: [
          { bookId: req.params.bookId },
          { userId: req.userDetails.id },
        ],
      },
    });
    res.sendStatus(204);
  } catch (error) {
    throw error;
  }
};

function findPopular(arr) {
  // Step 1: Create an object to store the count of each item in the array
  const count = {};

  // Step 2: Iterate through the array and increment the count for each item in the object
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (count[item]) {
      count[item]++;
    } else {
      count[item] = 1;
    }
  }

  // Step 3: Find the item with the count greater than 4 in the object
  const popularItems = [];
  const minCount = 2;
  for (const item in count) {
    if (count[item] > minCount) {
      popularItems.push(item);
    }
  }

  return popularItems;
}

const popularBooks = async (req, res) => {
  try {
    const Likes = await like.findAll({
      attributes: ['bookId'],
    });
    // map likes data to get new array
    const newArr = Likes.map((book) => book.bookId);

    const popular = findPopular(newArr);

    const arr2 = [];

    for (let i = 0; i < popular.length; i++) {
      const booksFound = books.findOne({
        where: { book_id: popular[i] },
      });

      arr2.push(booksFound);
    }
    const data = await Promise.all(arr2);
    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
};

// const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
// console.log(findPopular(arr));

export {
  AddBook,
  editBook,
  deleteBook,
  viewBook,
  viewAllBook,
  getFavoriteBooks,
  getUsers,
  viewUser,
  editUser,
  deleteUser,
  likeBook,
  comentBook,
  markFavoriteBook,
  unmarkFavoriteBook,
  popularBooks,
  findPopular,
};

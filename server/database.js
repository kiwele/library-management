/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import Sequelize from 'sequelize';
import roles from './models/roles.js';
import user from './models/user.js';
import books from './models/books.js';
import favouriteBooks from './models/favouriteBooks.js';
import comments from './models/comments.js';
import likes from './models/likes.js';

const sequelize = new Sequelize('fullStackTask', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = roles(sequelize, Sequelize);
db.books = books(sequelize, Sequelize);
db.user = user(sequelize, Sequelize);
db.favouriteBooks = favouriteBooks(sequelize, Sequelize);
db.comments = comments(sequelize, Sequelize);
db.likes = likes(sequelize, Sequelize);

// making table relations

// user and roles
db.roles.role.hasMany(db.user.User, {
  foreignKey: 'roleId',
});
db.user.User.belongsTo(db.roles.role, {
  foreignKey: 'roleId',
});

// user and likes
db.user.User.hasMany(db.likes.like, {
  foreignKey: 'userId',
});
db.likes.like.belongsTo(db.user.User, {
  foreignKey: 'userId',
});

// user and comments
db.user.User.hasMany(db.comments.comments, {
  foreignKey: 'userId',
});
db.comments.comments.belongsTo(db.user.User, {
  foreignKey: 'userId',
});

// user and favourite book
db.user.User.hasMany(db.favouriteBooks.favouriteBooks, {
  foreignKey: 'userId',
});
db.favouriteBooks.favouriteBooks.belongsTo(db.user.User, {
  foreignKey: 'userId',
});

// boos and likes
db.books.books.hasMany(db.likes.like, {
  foreignKey: 'bookId',
});
db.likes.like.belongsTo(db.books.books, {
  foreignKey: 'bookId',
});

// books and comments
db.books.books.hasMany(db.comments.comments, {
  foreignKey: 'bookId',
});
db.comments.comments.belongsTo(db.books.books, {
  foreignKey: 'bookId',
});

// book and favourite books
db.books.books.hasMany(db.favouriteBooks.favouriteBooks, {
  foreignKey: 'bookId',
});
db.favouriteBooks.favouriteBooks.belongsTo(db.books.books, {
  foreignKey: 'bookId',
});

export default db;

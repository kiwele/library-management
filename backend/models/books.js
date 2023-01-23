export default (sequelize, Sequelize) => {
  const books = sequelize.define('books', {
    book_id: {
      type: Sequelize.INTEGER(1),
      autoIncrement: true,
      primaryKey: true,
    },
    bookName: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    Description: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
  });

  return { books };
};

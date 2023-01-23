export default (sequelize, Sequelize) => {
  const favouriteBooks = sequelize.define('favouriteBooks', {
    id: {
      type: Sequelize.INTEGER(1),
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return { favouriteBooks };
};

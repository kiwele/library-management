export default (sequelize, Sequelize) => {
  const like = sequelize.define('like', {
    Id: {
      type: Sequelize.INTEGER(1),
      autoIncrement: true,
      primaryKey: true,
    },

  });

  return { like };
};

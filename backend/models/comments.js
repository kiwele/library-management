export default (sequelize, Sequelize) => {
  const comments = sequelize.define('comments', {
    Id: {
      type: Sequelize.INTEGER(1),
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
  });

  return { comments };
};

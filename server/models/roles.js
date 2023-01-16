export default (sequelize, Sequelize) => {
  const role = sequelize.define('role', {
    role_id: {
      type: Sequelize.INTEGER(1),
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: Sequelize.STRING,
      required: true,
    },
  });

  return { role };
};

export default (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        required: true,
      },
      last_name: {
        type: Sequelize.STRING,
        required: true,
      },
      user_name: {
        type: Sequelize.STRING,
        required: true,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
      },

    },
  );

  return {
    User,
  };
};

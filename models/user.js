module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please use a valid email address.'
        }
      },
      unique: {
        args: true,
        msg: 'There is already an account associated with this Email.'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
}

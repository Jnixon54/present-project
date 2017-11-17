module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('user', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Datatypes.STRING(50),
      allowNull: false
    },
    password: {
      type: Datatypes.STRING(255),
      allowNull: true
    },
    displayname: {
      type: Datatypes.STRING(50),
      allowNull: true
    },
    created_at: {
      type: Datatypes.DATE,
      allowNull: false
    },
    updated_at: Datatypes.DATE,
    deleted_at: Datatypes.DATE
  }, {
    paranoid: true,
    underscored: true
  });
  return User;
}
module.exports = (sequelize, Datatypes) => {
  const Presentation = sequelize.define('presentation', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
    },
    owner_id: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    id_string: {
      type: Datatypes.STRING(64)
    },
    created_at: {
      type: Datatypes.DATE,
      allowNull: false
    },
    updated_at: Datatypes.DATE,
    deleted_at: Datatypes.DATE
  }, {
    paranoid: true, // retains 'deleted' items with timestamp of deletion but will not return them in queries
    underscored: true // automatically created columns with be generated in snake case
  });
  return Presentation;
}
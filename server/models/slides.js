module.exports = (sequelize, Datatypes) => {
  const Slide = sequelize.define('slide', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slide_number: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    url: {
      type: Datatypes.TEXT,
      allowNull: false
    },
    parent_presentation: {
      type: Datatypes.INTEGER,
      allowNull: false
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
  })
  return Slide;
}
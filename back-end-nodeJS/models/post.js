const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return post.init(sequelize, DataTypes);
}

class post extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: "id"
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'post',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "id",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "post_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return post;
  }
}

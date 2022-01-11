var DataTypes = require("sequelize").DataTypes;
var _post = require("./post");
var _user = require("./user");

function initModels(sequelize) {
  var post = _post(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  post.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(post, { as: "posts", foreignKey: "userId"});

  return {
    post,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

const models = require("../config/db").initedModels;
const User = models.user;

class UserRepository {
    constructor() { }

    getUserById(id) {
        return User.findByPk(id);
    }

    getUserByEmail(email) {
        return User.findOne({ where: { email: email } });
    }

    createUser(user) {
        return User.create(user);
    }
}

module.exports = {
    UserRepository: UserRepository,
    userRepository: new UserRepository()
};
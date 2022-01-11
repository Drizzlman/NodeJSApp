const { validationResult } = require('express-validator');
const { userRepository } = require('../repositories/user.repository')
const { makeAccessToken } = require('../core/makeAccessToken')
const { HTTPUtilities } = require('../core/HTTPUtilities')
const HTTPStatusCodes = require('../core/HTTPStatusCodes');
const bcrypt = require('bcryptjs');


class AuthController extends HTTPUtilities {
    constructor(userRepository) {
        super()
        this.userRepository = userRepository;
    }

    login = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        let loadedUser;
        this.userRepository.getUserByEmail(email)
            .then(user => {
                if (!user) {
                    this.generateError(HTTPStatusCodes.EMAIL_NOT_FOUND)
                }
                loadedUser = user;
                return bcrypt.compare(password, user.password);
            })
            .then(isEqual => {
                if (!isEqual) {
                    this.generateError(HTTPStatusCodes.INVALID_PASSWORD)
                }
                this.successResponse(res, HTTPStatusCodes.SUCCESS.status, { token: makeAccessToken(loadedUser), userId: loadedUser.id })
            }).catch(err => {
                next(err);
            });
    };

    signup = (req, res, next) => {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        if (!validationResult(req).isEmpty()) {
            this.generateError(HTTPStatusCodes.VALIDATION, validationResult(req).array());
        }

        this.userRepository.getUserByEmail(email).then(user => {

            if (user) {
                this.generateError(HTTPStatusCodes.EMAIL_EXIST)
            }

            bcrypt
                .hash(password, 12)
                .then(hashedPw => {
                    return this.userRepository.createUser({ email: email, name: name, password: hashedPw });
                })
                .then(result => {
                    this.successResponse(res, HTTPStatusCodes.SUCCESS.status, { message: 'User created!', userId: result.id })
                })

        }).catch(err => {
            next(err);
        });
    };

    getUserStatus = (req, res, next) => {
        this.userRepository.getUserById(req.userId).then(user => {
            if (!user) {
                this.generateError(HTTPStatusCodes.NOT_FOUND)
            }
            this.successResponse(res, HTTPStatusCodes.SUCCESS.status, { status: user.status })
        }).catch(err => {
            next(err);
        });
    }

    updateUserStatus = (req, res, next) => {
        const newStatus = req.body.status;
        this.userRepository.getUserById(req.userId)
            .then(user => {
                if (!user) {
                    this.generateError(HTTPStatusCodes.NOT_FOUND)
                }
                user.status = newStatus;
                return user.save();
            })
            .then(result => {
                this.successResponse(res, HTTPStatusCodes.SUCCESS.status, { message: 'User updated.' })
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = {
    AuthController,
    authController: new AuthController(userRepository)
};
const express = require('express');
const { body } = require('express-validator');
const { authController } = require('../controllers/auth.controller');

class AuthRouter {
    constructor(router, authController) {
        this.router = router;
        this.authController = authController;
        this.setupRouter();
    }

    setupRouter() {
        this.router.post('/login', this.authController.login);
        this.router.put('/signup',
            [
                body('email')
                    .isEmail()
                    .withMessage('Please enter a valid email.')
                    .normalizeEmail(),
                body('password')
                    .trim()
                    .isLength({ min: 5 }),
                body('name')
                    .trim()
                    .not()
                    .isEmpty()
            ],
            this.authController.signup);
        this.router.get('/status', this.authController.getUserStatus);
        this.router.patch('/status', this.authController.updateUserStatus);
    }

    get authRouter() {
        return this.router;
    }
}

module.exports = {
    AuthRouter,
    authRouter: new AuthRouter(express.Router(), authController).authRouter
};
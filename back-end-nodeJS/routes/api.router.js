const express = require("express");
const { authRouter } = require('./auth');
const { feedRouter } = require('./feed');
const { checkToken } = require('../middleware/checkToken');

class ApiRouter {
    constructor(router, routes) {
        this.router = router;
        this.routes = routes;
        this.setupRoutes(routes);
    }

    get apiRouter() {
        return this.router;
    }

    addRoute(url, router) {
        this.router.use(url, router);
    }

    setupRoutes(routes) {
        routes.forEach((route) => {
            this.addRoute(route.url, route.router);
        });
    }
}

const routes = [
    { url: '/auth', router: authRouter },
    { url: '/feed', router: feedRouter }
];

module.exports = {
    ApiRouter,
    apiRouter: new ApiRouter(express.Router(), routes).apiRouter
};
const express = require('express');
const { feedController } = require('../controllers/feed.controller')

class FeedRouter {
    constructor(router, feedController) {
        this.router = router;
        this.feedController = feedController;
        this.setupRouter();
    }

    setupRouter() {
        this.router.post('/post', this.feedController.createPost);
        this.router.put('/post/:postId', this.feedController.updatePost);
        this.router.delete('/post/:postId', this.feedController.removePost);
        this.router.get('/post/:postId', this.feedController.getPost);
        this.router.get('/posts', this.feedController.getAllPosts);
    }

    get feedRouter() {
        return this.router;
    }
}

module.exports = {
    FeedRouter,
    feedRouter: new FeedRouter(express.Router(), feedController).feedRouter
};
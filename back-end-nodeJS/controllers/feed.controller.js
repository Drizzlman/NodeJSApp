const fs = require('fs');
const path = require('path');

const { HTTPUtilities } = require('../core/HTTPUtilities')
const HTTPStatusCodes = require('../core/HTTPStatusCodes');

const { postRepository } = require('../repositories/post.repository')
const { userRepository } = require('../repositories/user.repository')


class FeedController extends HTTPUtilities {
    constructor(postRepository, userRepository) {
        super()
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    createPost = (req, res, next) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     const error = new Error('Validation failed, entered data is incorrect.');
        //     error.statusCode = 422;
        //     throw error;
        // }
        if (!req.file) {
            const error = new Error('No image provided.');
            error.statusCode = 422;
            throw error;
        }
        const imageUrl = req.file.path.replace("\\", "/");;
        const title = req.body.title;
        const content = req.body.content;
        let post
        this.postRepository.createPost({
            title: title,
            content: content,
            imageUrl: imageUrl,
            userId: req.userId
        }).then(result => {
            post = result;
            return this.userRepository.getUserById(req.userId);
        }).then(user => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: post,
                user: { id: user.id, name: user.name }
            });
        }).catch(err => {
            next(err);
        });
    };

    removePost = (req, res, next) => {
        const postId = req.params.postId;
        this.postRepository.getPostById(postId)
            .then(post => {
                if (!post) {
                    this.generateError(HTTPStatusCodes.NOT_FOUND)
                }
                if (post.userId !== req.userId) {
                    this.generateError(HTTPStatusCodes.UNAUTHORIZED)
                }
                // Check logged in user
                this.clearImage(post.imageUrl);
                return post.destroy();
            })
            .then(result => {
                this.successResponse(res, HTTPStatusCodes.SUCCESS.status, { message: 'Deleted post.' })
            })
            .catch(err => {
                next(err);
            });
    }

    updatePost = (req, res, next) => {
        const postId = req.params.postId;
        const title = req.body.title;
        const content = req.body.content;
        let imageUrl = req.body.image;
        if (req.file) {
            imageUrl = req.file.path.replace("\\", "/");
        }
        if (!imageUrl) {
            this.generateError(HTTPStatusCodes.NO_FILE)
        }
        this.postRepository.getPostById(postId)
            .then(post => {
                if (!post) {
                    this.generateError(HTTPStatusCodes.NOT_FOUND)
                }
                if (imageUrl !== post.imageUrl) {
                    this.clearImage(post.imageUrl);
                }
                post.title = title;
                post.imageUrl = imageUrl;
                post.content = content;
                return post.save();
            }).then(result => {
                this.successResponse(res, HTTPStatusCodes.SUCCESS.status, { message: 'Post updated!', post: result })
            })
            .catch(err => {
                next(err);
            });
    }

    getPost = (req, res, next) => {
        const postId = req.params.postId;
        this.postRepository.getPostById(postId)
            .then(post => {
                if (!post) {
                    this.generateError(HTTPStatusCodes.NOT_FOUND)
                }
                this.successResponse(res, HTTPStatusCodes.SUCCESS.status, { message: 'Post fetched.', post: post })
            })
            .catch(err => {
                next(err);
            });
    }

    getAllPosts = (req, res, next) => {
        const currentPage = req.query.page || 1;
        const perPage = 2;
        const offset = (currentPage - 1) * perPage;
        this.postRepository.getPostsWithPaging(req.userId, offset, perPage).then(({ count, rows }) => {
            this.successResponse(res, HTTPStatusCodes.SUCCESS.status,
                {
                    message: 'Fetched posts successfully.',
                    posts: rows,
                    totalItems: count
                });
        }).catch(err => {
            next(err);
        });
    }

    clearImage = filePath => {
        //filePath = path.join(__dirname, '..', filePath);
        fs.unlink(filePath, err => console.log(err));
    };
}

module.exports = {
    FeedController,
    feedController: new FeedController(postRepository, userRepository)
};
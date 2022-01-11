const models = require('../config/db').initedModels;
const Post = models.post
const User = models.user

class PostRepository {
    constructor() { }

    createPost = (post) => {
        return Post.create(post);
    }

    getAllPostsByUserId = (userId) => {
        return Post.findAll({ where: { userId: userId }, include: [{ model: User, attributes: ['name'], as: 'user' }] });
    }

    getPostById = (id) => {
        return Post.findByPk(id, { include: [{ model: User, attributes: ['name'], as: 'user' }] });
    }

    getPostsWithPaging = (userId, offset, limit) => {
        return Post.findAndCountAll(
            {
                where: { userId: userId },
                offset: offset,
                limit: limit,
                include: [{ model: User, attributes: ['name'], as: 'user' }],
                order: [['id', 'DESC']]
            })
    }
}

module.exports = {
    PostRepository: PostRepository,
    postRepository: new PostRepository()
}
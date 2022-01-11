const jwt = require('jsonwebtoken');

exports.makeAccessToken = (user) => {
    let config = {
        payload: {
            email: user.email,
            userId: user.id
        },

        options: {
            //algorithm: 'HS512',
            expiresIn: process.env.TOKEN_ACCESS_EXP
        }
    };
    
    return jwt.sign(config.payload, process.env.JWT_SECRET_KEY, config.options);
}


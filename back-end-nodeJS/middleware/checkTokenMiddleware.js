
const { checkToken } = require('./checkToken');

const unless = require("express-unless");

checkToken.unless = unless;

const checkTokenUnless = checkToken.unless({
    method: 'OPTIONS',
    path: [
        ///\/api\/auth\/.*/
        `/api/auth/login`,
        `/api/auth/signup`
    ]
})

module.exports = {
    checkTokenMiddleware: checkTokenUnless
}
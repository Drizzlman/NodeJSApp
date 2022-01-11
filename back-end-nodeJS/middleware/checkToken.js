const jwt = require('jsonwebtoken');
const HTTPStatusCodes = require('../core/HTTPStatusCodes');
const { HTTPUtilities } = require('../core/HTTPUtilities');

class CheckToken extends HTTPUtilities {
  constructor() {
    super()
  }

  checkToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log("MIDDLEWARE HERE")
    console.log(authHeader)
    console.log(req.url)
    console.log(req.method)
    try {
      if (!authHeader) {
        this.generateError(HTTPStatusCodes.UNAUTHORIZED);
      }
    } catch (err) {
      next(err);
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      this.generateError(HTTPStatusCodes.EXTERNAL);
      next(err);
    }
    try {
      if (!decodedToken) {
        this.generateError(HTTPStatusCodes.UNAUTHORIZED);
      }
    } catch (err) {
      next(err);
    }
    req.userId = decodedToken.userId;
    next();
  };

}

module.exports = {
  checkToken: new CheckToken().checkToken
}
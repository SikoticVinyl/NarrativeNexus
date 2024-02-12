const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Function to be used as middleware in Apollo Server
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.query or headers
    let token = req.query?.token || req.headers?.authorization;

    // Extract token if it comes as "Bearer <tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // Add user to the context if token is valid
    if (token) {
      try {
        // Verify token and get user data out of it
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
    }

    // Return the request object so it can be added to the context
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};


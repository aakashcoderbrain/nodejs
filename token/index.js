const jwt = require('jsonwebtoken');

function generateAccessToken(user_id) {
  const payload = {
    id: user_id
  };

  const secret = 'your-access-token-secret'; 
  const options = { expiresIn: '1h' }; 

  return jwt.sign(payload, secret, options);
}

module.exports = { generateAccessToken };
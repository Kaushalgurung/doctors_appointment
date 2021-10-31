const { User } = require('../modules/admin/admin.controllers');
const jwt = require('jsonwebtoken');


const Secure = async (reoutePermissions, req) => {
  if (reoutePermissions.length === 0) return true;

  const token = req.query.access_token || req.headers.access_token;
  if (!token) throw Error('No access token was sent');

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return decoded.is_admin;
  } catch (e) {
    return false;
  }
};

module.exports = Secure;

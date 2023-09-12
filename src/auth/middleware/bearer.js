'use strict';

const { users } = require('../../models/index');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { _authError(); }

    const token = req.headers.authorization.split(' ').pop();
    const validUsers = await users.authenticateToken(token);
    req.users = validUsers;
    req.token = validUsers.token;
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};
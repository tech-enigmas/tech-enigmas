'use strict';

function administrator(req, res, next) {
  if (req.user && req.user.role === 'administrator') {
    return next();
  } else {
    return res.status(400).json({ message: 'Access denied' });
  }
}

function contributor(req, res, next) {
  if (req.user && req.user.role === 'contributor') {
    return next();
  } else {
    return res.status(400).json({ message: 'Access denied' });
  }
}

module.exports = administrator, contributor;

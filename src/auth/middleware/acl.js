'use strict';
module.exports = (capability) => {

  return (req, res, next) => {
    try {
      if (req.users.capabilities.includes(capability)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};
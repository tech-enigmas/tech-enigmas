'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { users } = require('../../..');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (mongoose, DataTypes) => {
  const model = mongoose.define('Users', {
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true, unique: true },
    role: {
      type: DataTypes.ENUM('user', 'creator'),
      required: true,
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          creator: ['read', 'create'],
        };
        return acl[this.role];
      },
    },
  });
  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const users = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, users.password);
    if (valid) {
      return users;
    }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const users = this.findOne({ where: { username: parsedToken.username } });
      if (users) {
        return users;
      }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;

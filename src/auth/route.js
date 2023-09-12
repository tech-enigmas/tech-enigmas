'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const permissions = require('./middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
  console.log('signup route!');
  try {
    let userRecord = await users.create(req.body);
    const output = {
      users: userRecord,
      token: userRecord.token
    };
    console.log(output);
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const users = {
    users: req.users,
    token: req.users.token
  };
  res.status(200).json(users);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(users => users.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Top secret area');
});

module.exports = authRouter;
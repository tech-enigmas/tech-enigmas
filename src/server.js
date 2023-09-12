'use strict';

require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const basic = require('./middleware/basic');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongoose is connected'));

app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create(req.body);
    res.staus(200).json(record);
  } catch (e) { res.status(200).send('Error creating user'); }
});

const handleSignin = async (req, res) => {
  res.status(200).send(req.user);
};

app.post('/signin', basic, handleSignin);
app.listen(PORT, () => console.log(`listening on ${PORT}`));


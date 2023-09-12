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


app.listen(PORT, () => console.log(`listening on ${PORT}`));


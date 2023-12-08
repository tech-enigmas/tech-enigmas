'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const postHandler = require('./src/auth/modules/postHandler');
const userHandler = require('./src/auth/modules/userHandler');
const getCamping = require('./src/auth/modules/campingHandler');
const getAirbnb = require('./src/auth/modules/airbnbHandler');
const travelRoutes = require('./src/auth/modules/travelRoutesHandler');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', userHandler.getUser);
app.post('/users', userHandler.createUser);
app.delete('/users/:id', userHandler.deleteUser);
app.put('/users/:id', userHandler.updateUser);


app.get('/posts', postHandler.getPost);
app.post('/posts', postHandler.createPost);
app.delete('/posts/:id', postHandler.deletePost);
app.put('/posts/:id', postHandler.updatePost);

app.get('/', (req, res) => res.status(200).send('Default route working'));

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

app.get('/airbnb', getAirbnb);
app.get('/camping', getCamping);

app.get('/travel-routes', travelRoutes.getTravelRoutes);
app.get('/travel-routes/:id', travelRoutes.getOneTravelRoute);
app.post('/travel-routes', travelRoutes.addTravelRoute);
app.patch('/travel-routes/:id', travelRoutes.editTravelRoute);
app.delete('/travel-routes/:id', travelRoutes.deleteTravelRoute);

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => console.log('Mongoose is connected'));

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

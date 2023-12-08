'use strict';
const TravelRoute = require('../schema-models/travelRoutes');

const travelRoutes = {};

travelRoutes.getTravelRoutes = async function (req, res, next) {
  let searchQuery = {email: req.user.email};
  try {
    const allRoutes = await TravelRoute.find(searchQuery);
    if(allRoutes.length > 0) {
      res.status(200).json(allRoutes);
    } else {
      res.status(404).send('user not found');
    }
  } catch (err) {
    next(err);
  }
};

travelRoutes.getOneTravelRoute = async function(req, res, next) {
  const { id } = req.params;
  try {
    let travelRoute = await TravelRoute.findById(id);
    res.status(200).json(travelRoute);
  } catch (err) {
    next(err);
  }
};

travelRoutes.addTravelRoute = async function(req, res, next) {
  const data = req.body;
  data.email = req.user.email;
  try {
    const newRoute = await TravelRoute.create(data);
    res.status(201).json(newRoute);
  } catch (err) {
    next(err);
  }
};

travelRoutes.editTravelRoute = async function(req, res, next) {
  const { id } = req.params;
  const data = req.body;
  console.log('req.user', req.user);
  console.log(req);
  data.email = req.user.email;
  data.location = req.body.location || data.location;
  data.campsite = req.body.campsite || data.campsite;
  data.airbnb = req.body.airbnb || data.airbnb;

  try {
    const editedRoute = await TravelRoute.findByIdAndUpdate(id, data, {new: true, overwrite: true});
    res.status(200).json(editedRoute);
  } catch (err) {
    next(err);
  }
};

travelRoutes.deleteTravelRoute = async function(req, res, next) {
  const { id } = req.params;
  try {
    await TravelRoute.findByIdAndDelete(id);
    res.status(204).json({message: 'Deleted route'});
  } catch (err) {
    next(err);
  }
};


module.exports = travelRoutes;
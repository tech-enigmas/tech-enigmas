'use strict';
require('dotenv').config();
const axios = require('axios');
const cache = require('./cache');

async function getAirbnb(req, res, next) {
  const { location, checkin, checkout, adults, children, pets } = req.query;
  const key = 'airbnb' + location;
  const options = {
    method: 'GET',
    url: 'https://airbnb13.p.rapidapi.com/search-location',
    params: {
      location: location, // string
      checkin: checkin, // date
      checkout: checkout, // date
      adults: adults, // number
      children: children,
      pets: pets,
      page: 1
    },
    headers: {
      'X-RapidAPI-Key': process.env.AIRBNB_API_KEY,
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
  };

  try {
    if(cache[key]) {
      console.log('cache hit'); // delete later
      res.status(200).send(cache[key].data);
    } else {
      let response = await axios.request(options);
      let formattedData = response.data.results.map(airbnb => new Airbnb(airbnb));
      cache[key] = {};
      cache[key].data = formattedData;
      console.log('cache miss'); // delete later
      res.status(200).send(formattedData);
    }
  } catch (err) {
    next(err);
  }
}

class Airbnb {
  constructor(obj) {
    this.url = obj.url;
    this.city = obj.city;
    this.hostThumbnail = obj.hostThumbnail;
    this.persons = obj.persons;
    this.reviewsCount = obj.reviewsCount;
    this.rating = obj.rating;
    this.address = obj.address;
    this.price = obj.price;
    this.previewAmenities = obj.previewAmenities;
    this.deepLink = obj.deepLink;
    this.name = obj.name;
    this.bathrooms = obj.bathrooms;
    this.bedrooms = obj.bedrooms;
    this.bed = obj.beds;
    this.images = obj.images;
  }
}

module.exports = getAirbnb;

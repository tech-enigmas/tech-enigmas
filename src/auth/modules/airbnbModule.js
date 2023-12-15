
'use strict';
require('dotenv').config();
const axios = require('axios');
// const cache = require('./cache');

async function getAirbnb(req, res, next) {
  console.log('made it to the route');
  const { location, checkin, checkout, adults, children, pets } = req.query;
  const key = 'airbnb' + location;




  const options = {
    method: 'GET',
    url: 'https://airbnb13.p.rapidapi.com/search-location',
    params: {
      location: location,
      checkin: checkin,
      checkout: checkout,
      adults: adults,
      children: children,
      pets: pets,
      page: '1',
      currency: 'USD'
    },
    headers: {
      'X-RapidAPI-Key': process.env.AIRBNB_API_KEY,
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.results);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
  //   axios.get(url, config)
  // .then(response => response.data.RECDATA.map(location => new Airbnb(location)))
  // .then(formattedData => res.status(200).send(formattedData))
  // .catch(err => next(err));
  // console.log(url, config);

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







//   const options = {
//     method: 'GET',
//     url: 'https://airbnb13.p.rapidapi.com/search-location',
//      params: {
//         location: 'Paris',
//         checkin: '2023-09-16',
//         checkout: '2023-09-17',
//         adults: '1',
//         children: '0',
//         infants: '0',
//         pets: '0',
//         page: '1',
//         currency: 'USD'
//       },
//     // params: {
//     //   location: location, // string
//     //   checkin: checkin, // date
//     //   checkout: checkout, // date
//     //   adults: adults, // number
//     //   children: children,
//     //   pets: pets,
//     //   page: 1
//     // },
//     headers: {
//       'X-RapidAPI-Key': process.env.AIRBNB_API_KEY,
//       'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
//     }
//   };

//   try {
//     if(cache[key]) {
//       console.log('cache hit'); // delete later
//       res.status(200).send(cache[key].data);
//     } else {
//       console.log('attempting to make request')
//       let response = await axios.request(options);
//       console.log(response);
//       let formattedData = response.data.results.map(airbnb => new Airbnb(airbnb));
//       cache[key] = {};
//       cache[key].data = formattedData;
//       console.log('cache miss'); // delete later
//       res.status(200).send(formattedData);
//     }
//   } catch (err) {
//     next(err);
//   }


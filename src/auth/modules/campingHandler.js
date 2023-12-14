'use strict';

const axios = require('axios');

async function getCamping (req, res, next) {
  const { query } = req.query;
  console.log(query);
  const url = `https://ridb.recreation.gov/api/v1/facilities?query=${query}&limit=4&activity=6,CAMPING`;
  console.log(url);
  const config = {
    headers: {
      apikey: process.env.CAMPING_API_KEY
    }
  };
  axios.get(url, config)
    .then(response => response.data.RECDATA.map(site => new Campsite(site)))
    .then(formattedData => res.status(200).send(formattedData))
    .catch(err => next(err));
}

class Campsite {
  constructor(campingObj){
    this.site = campingObj.FacilityName;
    this.fee = campingObj.FacilityUseFeeDescription;
    this.description = campingObj.FacilityTypeDescription;
    this.image = campingObj.MEDIA;
  }
}

module.exports = getCamping;

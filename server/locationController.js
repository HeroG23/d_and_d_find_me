const axios = require("axios");
const { REACT_APP_API_KEY } = process.env;

module.exports = {
  postAddress: (req, res, next) => {
    const { lat, lon } = req.body;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=48280&type=gamestore&keyword=dungeonsanddragons%20games&key=${REACT_APP_API_KEY}`
      )
      .then((res) => {
        res.status(200).send(res.data);
      });
  },
};

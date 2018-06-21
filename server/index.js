const express = require("express");
const app = express();
const yelpFusion = require("yelp-fusion");
const qs = require("querystringify");
const PORT = 3001;

//Use for manage env variables
require("dotenv").config();
app.set("view engine", "ejs");

const client = yelpFusion.client(process.env.ACCESS_TOKEN);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/:query", (req, res) => {
  const query = qs.parse(req.params.query);

  //console.log(...query);
  client
    .search({
      ...query
    })
    .then(response => {
      const businesses = JSON.parse(response.body);
      res.send(businesses);
    })
    .catch(e => console.log(e));
});

//Set the connection with server
app.listen(PORT, () => {
  console.log(`Now listening for requests on PORT ${PORT}`);
});

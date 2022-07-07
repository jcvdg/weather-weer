// Import all dependencies & middleware here
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

// Connect to the database
// for debugging if connection succeeded or failed
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected!');
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

// Init an Express App.
const app = express();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const updateQueryCount = (count) => {
  console.log(`update query count: ${count}`);
};

app.get('/historicalweather/:latitude/:longitude/:startdate/:enddate', (request, response) => {
  const {
    latitude,
    longitude,
    startdate,
    enddate,
  } = request.params;

  console.log('otherget: ', latitude, longitude, startdate, enddate);


  const apiUrlHistorical = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${startdate}/${enddate}?unitGroup=us&include=histfcst%2Cobs&elements=datetime,temp,tempmin,tempmax,icon,iconSet=icon2&key=${process.env.WEATHER_API_KEY}&contentType=json`;

  fetch(apiUrlHistorical)
    .then((res) => res.json())
    .then((data) => {
      // console.log('Object ', data);
      updateQueryCount(data.queryCost);

      // const {latitude, longitude} = data;
      console.log(data.latitude, data.longitude);

      response.json(
        {
          // datetime: data.datetime,
          year: startdate.split('-')[0],
          start: startdate,
          end: enddate,
          location: data.resolvedAddress,
          latitude: data.latitude,
          longitude: data.longitude,
          days: data.days,
        },
      );
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/weather/:city', (request, response) => {
  const cityName = request.params.city.toLowerCase();
  console.log({ cityName });

  const apiUrlForecast = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${process.env.WEATHER_API_KEY}`;

  // use the same latitude, longitude as the forecast.
  fetch(apiUrlForecast)
    .then((res) => res.json())
    .then((data) => {
      // console.log('Object ', data);
      updateQueryCount(data.queryCost);

      // const {latitude, longitude} = data;
      // console.log(data.latitude, data.longitude);

      response.json({
        datetime: data.datetime,
        location: data.resolvedAddress,
        latitude: data.latitude,
        longitude: data.longitude,
        days: data.days,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

const dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/client/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html')));
}

// Start Server here
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

import React from 'react';
import WeatherCard from './WeatherCard';
import './Forecast.css';

const Forecast = (props) => {

  console.log('forecast component', props.forecast.days)

  const renderedForecast = props.forecast.days === undefined 
    ? (<div>enter a city</div>) 
    : (
        props.forecast.days.map( (day, i) => {
          console.log('map: ',day.temp);
          return (
            <WeatherCard 
              date={day.datetime}
              temp={day.temp}
              max={day.tempmax}
              min={day.tempmin}
              icon={day.icon}
              key={i}
              />
          )
        })
      );

  return (
    <div className="Forecast"> 
      <h2>Forecast</h2> 
      <div className="forecast-data">
        {renderedForecast}
      </div>
    </div>
  );
};

export default Forecast;


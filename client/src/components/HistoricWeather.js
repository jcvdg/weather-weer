import React from 'react';
import WeatherCard from './WeatherCard';
import './HistoricWeather.css';

const HistoricalWeather = (props) => {
  console.log('props historica data length, ', props.historicData.length)
  console.log('props historica data length, ', props)

  const renderHistoricalWeather = (year) =>  ( 
    year.days.map( (day, i) => (
        <WeatherCard 
          date={day.datetime}
          temp={day.temp}
          max={day.tempmax}
          min={day.tempmin}
          icon={day.icon}
          key={i}
        />
      )
    )
  )

  return (
    <div className="HistoricWeather"> 
      <h2>Historical Weather</h2> 
      <div>
        {
          props.historicData.map( (year) => {
            return (
              <div className="past-year-weather" key={year.year}>
                <h3>{year.year}</h3>
                <div  className="weather-data-container">
                  {renderHistoricalWeather(year)}
                </div>
              </div>
            )
          })
        }
      </div>
  </div>
  );
};

export default HistoricalWeather;


import React from 'react';
import './WeatherCard.css';
import clearDayIcon from '../img/clear-day.svg'
import rainIcon from '../img/rain.svg'
import partlyCloudyDayIcon from '../img/partly-cloudy-day.svg'
import clearNightIcon from '../img/clear-night.svg'
import fogIcon from '../img/fog.svg'
import partlyCloudyNightIcon from '../img/partly-cloudy-night.svg'
import snowIcon from '../img/snow.svg'
import windIcon from '../img/wind.svg'
import thunderIcon from '../img/thunder.svg'
import cloudyIcon from '../img/cloudy.svg';


const WeatherCard = (props) => {

  const formatDate = (date) => {
    let dateObj = new Date(date);
    let arr = dateObj.toString().split(' ');
    return `${arr[1]} ${arr[2]}` // Jan 01
  }

  const displayIcon = (icon) => {
    switch(icon) {
      case "rain":
        return rainIcon;
      case "cloudy":
        return cloudyIcon;
      case "partly-cloudy-day":
        return partlyCloudyDayIcon;
      case "clear-day":
        return clearDayIcon;
      case "clear-night":
        return clearNightIcon;
      case "fog":
        return fogIcon;
      case "partly-cloudy-night":
        return partlyCloudyNightIcon;
      case "snow":
        return snowIcon;
      case "thunder":
        return thunderIcon;
      case "wind":
        return windIcon;
      default:
        return icon;
    }
  }

  return (
    <div className="WeatherCard">
      <div className="card">
        <div className="weather-card-content">
          <span className='date'>{formatDate(props.date)}</span>
          <div className="image">
            <img src={displayIcon(props.icon)} alt={props.icon} />
          </div>
          <div className="avg-temp">
            <span className="temperature">{props.temp}&#176;</span>
          </div>
          <div className="temperature-min-max">
            <span className="temp-max">{props.max}</span>
            <span> / </span>
            <span className="temp-min">{props.min}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard;
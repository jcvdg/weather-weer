import React, {useEffect, useState} from 'react';
import Forecast from './components/Forecast';
import HistoricalWeather from './components/HistoricWeather';
import './App.css'

const App = () => {

    const [city, setCity] = useState('');
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [historicData, setHistoricData] = useState(null);
    const [location, setLocation] = useState({});
    const [tempHistoric, setTempHistoric] = useState([]);
    const [dateError, setDateError] = useState(false);
 
    // upate to getforecast
    const getWeather = () => {
        fetch(`https://weather-weer.herokuapp.com/weather/${city}`)
        .then( response => response.json())
        .then( data => { 
            console.log(city);
            console.log('client ',data)
            
            setWeatherData(data);
            setLocation( {lat: data.latitude, lon: data.longitude} );
            console.log('new location: ----', location, '---', data.latitude, data.longitude);
        })
        .catch(err => console.log(err));
    }

    useEffect( () => {
        console.log('effect: ', location)
        
        if( !startdate || !enddate ) {
            return;
        }
        
        getTempHist();
    },[location]);
   
    const getTempHist = async () => {

        console.log('temp hist: ', location.lat, location.lon, startdate, enddate);

        let dateEndYear = enddate.split('-')[0]
        let start = startdate;
        let end = enddate;

        for( let i=0; i<5; i++) {
            if( (dateEndYear != new Date().getFullYear() || new Date(startdate) > new Date())) {
                start = getPriorYearDate(start);
                end = getPriorYearDate(end);    
                console.log('compare new year date ---- ', start, end)            
            } else {
                dateEndYear--;
                console.log(dateEndYear + "date end year")
            }
            console.log(`Start date: ${start} - End date: ${end}`)

            try {
                let response = await fetch(`https://weather-weer.herokuapp.com/historicalweather/${location.lat}/${location.lon}/${start}/${end}`)
                let data = await response.json();
                console.log(city);
                console.log('historical response data: ',data)
                let temp = tempHistoric
                temp.push(data)
                setTempHistoric( temp);
                console.log('counting print: ', i, setTempHistoric);
            } catch (error) {
                 console.log(error);
            }
        }
        console.log('gethistoricalweather');
        setHistoricData(true)
    }

    const getPriorYearDate = ( date ) => {
        let dateArr = date.split('-');
        dateArr[0] -= 1;
        return dateArr.join('-');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if( enddate < startdate) {
            setDateError(true);
            return;
        } else {
            setDateError(false);
        }
        console.log('WEATHER DATA: ', !weatherData)
        setTempHistoric([]);
        getWeather()
    }

    return (
        <div className="App">
            <div className={`left-container ${historicData ? "container-small" : weatherData ? "container" : ""}`}>
                <div className="search-form">
                    <h1>Weather Weer</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-9 form-row">
                                <label>City Name</label>
                            <input
                                type="search"
                                placeholder="Enter a city.."
                                className="form-control search-input"
                                onChange={e => setCity(e.target.value.split(' ').join(''))}
                                required
                            />
                            </div>
                            <div className="date-field">
                                <div className="past-weather-label"><span>Optional:</span><br></br>To get weather from the past 5 years, enter date range
                                 </div>
                                <div className="form-dates">
                                    <div className="form-row">
                                        <label htmlFor="startdate">Start Date</label>
                                        <input 
                                            type="date" 
                                            id="startdate" 
                                            name="startdate" 
                                            onChange={e => setStartdate(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="enddate">End Date</label>
                                        <input 
                                            type="date" 
                                            id="enddate" 
                                            name="enddate" 
                                            onChange={e => setEnddate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {dateError && <span className="error-message">* End Date must be after Start Date</span>}
                            </div>
                            <div className="col-3 p-0">
                                <input
                                    type="submit"
                                    value="Search"
                                    className="btn btn-primary w-100"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="forecast">
                    {weatherData &&  <Forecast forecast={weatherData}/>}
                </div>
            </div>
            {historicData &&
            <div className="right-container">
                <div className="historical-section">
                    <HistoricalWeather historicData={tempHistoric} />
                </div>
            </div>}
        </div>
    )
}

export default App;
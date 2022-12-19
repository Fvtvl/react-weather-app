import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg';
import normalBg from './assets/normal.jpg';
import Descriptions from './Components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';

function App() {
  const [city, setCity] = useState('dublino');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(hotBg);

useEffect(() => {
  const getWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units)
    setWeather(data);

    const threshold = units === 'metric' ? 0 : 32;
    if(data.temp <= threshold) setBg(coldBg);
    else if(units === 'metric' ? data.temp <= threshold + 16 : data.temp <= 60) setBg(normalBg);
    else setBg(hotBg);
  };

  getWeatherData()
},[units, city])


  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1)
    
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
      e.currentTarget.value = '';
    }
  };

  return (
      <div className='app' style={{ backgroundImage: `url(${bg})`}}>
        <div className="overlay">
          {
            weather && (
              <div className="container">
              <div className="section section__inputs">
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter City...' autocomplete="off" />
                <button onClick={(e)=> handleUnitsClick(e)}>°F</button>
              </div>
              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img 
                  src={weather.iconURL} 
                  alt='weatherIcon'></img>
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} ${units === 'metric' ? '°C' : '°F'}`}</h1>
                </div>
              </div>
              <Descriptions weather={weather} units={units} />
            </div>
            )
          }
         
        </div>
      </div>
  );
}

export default App;

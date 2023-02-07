import { useCallback, useRef } from 'react';
import Descriptions from './Components/Descriptions';

import useFetch from './hooks/useFetch';

function App() {
  const { setCity, weather, units, setUnits, bg } = useFetch();
  const textInput = useRef(null);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const enterKeyPressed = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        setCity(e.currentTarget.value);
        e.currentTarget.blur();
        e.currentTarget.value = '';
      }
    },
    [setCity]
  );

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div
              className="section section__inputs"
              onClick={() => handleClick()}
            >
              <input
                ref={textInput}
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
                autoComplete="off"
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon"></img>
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {`${weather.temp.toFixed()} ${
                    units === 'metric' ? '°C' : '°F'
                  }`}
                </h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

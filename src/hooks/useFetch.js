import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from '../weatherService';

import hotBg from '../assets/hot.jpg';
import coldBg from '../assets/cold.jpg';
import normalBg from '../assets/normal.jpg';

const useFetch = () => {
  const [city, setCity] = useState('dublino');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState();

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const threshold = units === 'metric' ? 0 : 32;
      if (data.temp <= threshold) setBg(coldBg);
      else if (
        units === 'metric' ? data.temp <= threshold + 16 : data.temp <= 60
      )
        setBg(normalBg);
      else setBg(hotBg);
    };

    getWeatherData();
  }, [units, city]);
  return { setCity, weather, units, setUnits, bg };
};

export default useFetch;

import axios from "axios";
const API_KEY = '9652434e52c62323aeae96cd3c0ae347';

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png` 

async function getFormattedWeatherData (city, units = 'mitric') {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const  { data } = await axios.get(URL).then(data => data);

    const { 
        weather,
        main: {
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
        },
        wind: {
            speed,
        },
        sys: { country },
        name,
    } = data;

    const { description, icon } = weather[0];

    return {
        description, 
        iconURL: makeIconURL(icon), 
        temp,
        feels_like, 
        temp_min, 
        temp_max, 
        pressure,
        humidity,
        speed,
        country,
        name,

    };
};

export { getFormattedWeatherData };
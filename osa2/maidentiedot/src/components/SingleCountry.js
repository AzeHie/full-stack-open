import axios from "axios";

import "./SingleCountry.css";
import { useEffect, useState } from "react";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState();
  const [iconUrl, setIconUrl] = useState("");
  const image = country.flags.png;

  useEffect(() => {
    const latitude = country.latlng[0];
    const longitude = country.latlng[1];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      )
      .then((res) => {
        let newWeather = {
          ...res.data,
          temp: (res.data.main.temp - 273.15).toFixed(2),
        };
        setIconUrl(
          `https://openweathermap.org/img/wn/${newWeather.weather[0].icon}@2x.png`
        );
        setWeather(newWeather);
      });
  }, [country.latlng]);

  const showWeather = weather ? (
    <div>
      <p>temperature {weather.temp} celcius</p>
      <img src={iconUrl} alt="weather icon" />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  ) : (
    <p>Loading..</p>
  );

  return (
    <div className="singlecountry__container">
      <h1>{country.name.common}</h1>
      <span>capital {country.capital}</span>
      <span>area {country.area}</span>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img className="singlecountry__flag" src={image} alt="flag of country" />
      <div className="singlecountry__weather">
        <h3>Weather in {country.capital}:</h3>
        {showWeather}
      </div>
    </div>
  );
};

export default SingleCountry;

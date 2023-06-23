import { Fragment } from "react";
import SingleCountry from "./SingleCountry";

const CountryList = ({ filteredCountries, showCountry }) => {

  if (filteredCountries.length > 10) {
    return (
      <div>
        <span>Too many matches, specify another filter</span>
      </div>
    );
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    return (
      <SingleCountry country={country} />
    );
  }

  return (
    <Fragment>
      {filteredCountries.map((country) => {
        return (
          <div key={country.name.common}>
            <span>{country.name.common}</span>
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        );
      })}
    </Fragment>
  );
};

export default CountryList;

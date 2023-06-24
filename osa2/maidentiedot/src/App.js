import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import Search from './components/Search';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then((res) => {
      setCountries(res.data);
    })
  },[]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    const searchResult = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCountries(searchResult);
  }

  const handleShowCountry = (singleCountry) => {
    const countryToShow = [singleCountry];
    setFilteredCountries(countryToShow);
  }

  return (
    <div className="app-container">
      <Search handleSearchChange={handleSearchChange} />
      <CountryList filteredCountries={filteredCountries} showCountry={handleShowCountry} />
    </div>
  );
}

export default App;

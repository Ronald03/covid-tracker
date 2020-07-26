import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  //"https://disease.sh/v3/covid-19/countries" 

  useEffect(() => {

    // async -> send a request, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countriesList = data.map((country) => ({
            name: country.country, // United States, United Kingdom
            value: country.countryInfo.iso2 // US, UK
          }));
          setCountries(countriesList)
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value);
  }
  return (
    <div className="App">
      <div className="app__header">
        {/* Header */}
        <h1>COVID-19 TRACKER</h1>

        {/* Title + Select input dropdown field */}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value={country}>{country}</MenuItem>
            {
              countries.map((item) => (
                <MenuItem value={item.value}>{item.value}</MenuItem>
              ))
            }
          
          </Select>
            
        </FormControl>
      </div>

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox.js'
import Map from './Map';
import Table from './Table';

// API
// "https://disease.sh/v3/covid-19/countries" 

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, []);

  // Get list of countries and country codes when page first load
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countriesList = data.map((country) => ({
            name: country.country, // United States, United Kingdom
            value: country.countryInfo.iso2 // US, UK
          }));

          setTableData(data);
          setCountries(countriesList)
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode);

    const url = countryCode === "Worldwide" 
                  ? "https://disease.sh/v3/covid-19/all" 
                  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  }
  console.log("COUNTRY INFO >>>", countryInfo );
  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          <h1>COVID-19 TRACKER</h1>

          {/* Title + Select input dropdown field */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value={country}>{country}</MenuItem>
              {
                countries.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxes */}
        <div className="app__stats">
          {/* InfoBox title="Cooronavirus cases" */}
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} totals={countryInfo.cases} />
          {/* INfoBox title="Coronavirus recoveries" */}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} totals={countryInfo.recovered} />
          {/* InfoBox Coronavirus deaths */}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} totals={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">  
        <CardContent>
          {/* Table */}
          <h3>Live Cases byCountry</h3>
          <Table countries= {tableData} />
          {/* Graph */}
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;

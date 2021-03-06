import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox.js'
import Map from './Map';
import Table from './Table';
import LineGraph from "./LineGraph.js"
import { sortData, prettyPrintStat } from "./util.js";
import "leaflet/dist/leaflet.css";

// API
// "https://disease.sh/v3/covid-19/countries" 

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState( {lat: 34.80746, lng: -40.4796} );
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases")
  

  
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

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countriesList)
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === "Worldwide" 
                  ? "https://disease.sh/v3/covid-19/all" 
                  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4);
    });
  }
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
          <InfoBox 
            isRed
            active={casesType === "cases"}
            title="Coronavirus Cases" 
            cases={ prettyPrintStat(countryInfo.todayCases)} 
            totals={prettyPrintStat(countryInfo.cases)} 
            onClick={(e) => setCasesType('cases')}
          />

          <InfoBox 
            active={casesType === "recovered"}
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            totals={prettyPrintStat(countryInfo.recovered)} 
            onClick={(e) => setCasesType('recovered')}
          />

          <InfoBox 
            isRed
            active={casesType === "deaths"}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            totals={prettyPrintStat(countryInfo.deaths)} 
            onClick={(e) => setCasesType('deaths')}
          />
        </div>

        {/* Map */}
        <Map 
        casesType={casesType}
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom} />
      </div>

      <Card className="app__right">  
        <CardContent>
          {/* Table */}
          <h3>Live Cases byCountry</h3>
          <Table countries= {tableData} />
          {/* Graph */}
          <h3>Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;

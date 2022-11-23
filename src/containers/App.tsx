import React, {useCallback, useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import CountryList from "../components/CountryList/CountryList";
import axios from "axios";
import type {CountryBrief, FullCountryData} from "../types";
import './App.css';

const ALL_URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name,flag';
const BASE_URL = 'https://restcountries.com/v2/alpha/';

function App() {
  const [countries, setCountries] = useState<CountryBrief[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<FullCountryData | null>(null);

  const fetchCounties = useCallback(async () => {
    const countriesResponse = await axios.get<CountryBrief[]>(ALL_URL);
    setCountries(countriesResponse.data);
    if (countriesResponse.data.length > 0) setSelectedIndex(0);
  }, []);

  useEffect(() => {
    fetchCounties().catch(console.error);
  }, [fetchCounties]);

  const fetchFullCountryInfo = useCallback(async (code: string) => {
    const countryResponse = await axios.get<FullCountryData>(BASE_URL + code);
    setSelectedCountry(countryResponse.data);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    fetchFullCountryInfo(countries[selectedIndex].alpha3Code).catch(console.error);
  }, [selectedIndex]);

  console.log(countries);
  console.log(countries.length)

  const countryMenu = countries.length === 0 ? (
    <div style={{background: "red"}}>NOTHING</div>
  ) : (
    <CountryList countries={countries}/>
  );

  return (
    <Container fixed className="App">
      <Grid container>
        <Grid item sm={3}>
          {countryMenu}
        </Grid>
        <Grid item sm={9}>
          content
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

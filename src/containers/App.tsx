import React, {useCallback, useEffect, useState} from 'react';
import {Box, Container, Grid} from "@mui/material";
import CountryList from "../components/CountryList/CountryList";
import axios from "axios";
import type {CountryBrief, FullCountryData} from "../types";
import './App.css';
import CountryInfo from "../components/CountryInfo/CountryInfo";
import Preloader from "../components/Preloader/Preloader";

const ALL_URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name,flag';
const BASE_URL = 'https://restcountries.com/v2/alpha/';

function App() {
  const [countries, setCountries] = useState<CountryBrief[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<FullCountryData | null>(null);
  const [neighbors, setNeighbours] = useState<FullCountryData[] | null>(null);

  const fetchCounties = useCallback(async () => {
    const countriesResponse = await axios.get<CountryBrief[]>(ALL_URL);
    setCountries(countriesResponse.data);
    if (countriesResponse.data.length > 0) setSelectedIndex(0);
  }, []);

  const fetchNeighbours = useCallback(async (countryCodes: string[] | undefined) => {
    if (countryCodes === undefined) return setNeighbours([]);
    const axiosResult = await Promise.all(countryCodes.map(async (code) => {
      return await axios.get<FullCountryData>(BASE_URL + code);
    }));
    const result = axiosResult.map(item => item.data);
    setNeighbours(result);
  }, []);

  const fetchFullCountryInfo = useCallback(async (code: string) => {
    const countryResponse = await axios.get<FullCountryData>(BASE_URL + code);
    setSelectedCountry(countryResponse.data);
    fetchNeighbours(countryResponse.data.borders).catch(console.error);
  }, [fetchNeighbours]);

  useEffect(() => {
    fetchCounties().catch(console.error);
  }, [fetchCounties]);

  useEffect(() => {
    if (selectedIndex === null) return;
    setNeighbours(null);
    fetchFullCountryInfo(countries[selectedIndex].alpha3Code).catch(console.error);
  }, [selectedIndex, countries, fetchFullCountryInfo]);

  const selectCountry = (index: number) => setSelectedIndex(index);

  const countryMenu = countries.length === 0 ? (
    <Preloader/>
  ) : (
    <CountryList
      countries={countries}
      selectedIndex={selectedIndex}
      selectCountry={selectCountry}
      heading="Choose a country"
    />
  );

  const selectNeighbour = (name: string) => {
    const index = countries.findIndex((country) => country.name === name);
    setSelectedIndex(index);
  };

  return (
    <Container className="App" fixed>
      <Grid container sx={{height: '100%'}}>
        <Grid item container sx={{height: '100%', padding: '.5em'}} xs={12} sm={6} md={4}>
          <Box sx={{boxShadow: '0 0 10px gainsboro', height: '100%', width: '100%'}}>
            {countryMenu}
          </Box>
        </Grid>
        <Grid item container sx={{height: '100%', padding: '.5em'}} xs={12} sm={6} md={8}>
          <Box sx={{margin: '0 .2em', boxShadow: '0 0 10px gainsboro', height: '100%', width: '100%'}}>
            <CountryInfo
              country={selectedCountry}
              neighbours={neighbors}
              selectNeighbour={selectNeighbour}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

import React from 'react';
import type {FullCountryData} from "../../types";
import {Grid, List, ListItem, Typography} from "@mui/material";
import CountryImage from "../CountryImage/CountryImage";
import NeighbourCountries from "../NeighbourCountries/NeighbourCountries";
import Preloader from "../Preloader/Preloader";

interface Props {
  country: FullCountryData | null;
  neighbours: FullCountryData[] | null;
  selectNeighbour: (name: string) => void;
}

const CountryInfo: React.FC<Props> = ({country, neighbours, selectNeighbour}) => {
  if (country === null) return <Preloader/>;

  return (
    <Grid container spacing={1} sx={{height: '100%', overflowX: 'auto'}}>
      <Grid item sm={12} md={6}>
        <Typography
          padding='.5em'
          variant='h5'
          textAlign='center'
        >{country.name}</Typography>
        <List>
          <ListItem>
            <Typography color="text.secondary">
              Capital:&nbsp;
              <Typography component="span" fontWeight="bold">
                {country.capital}
              </Typography>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography color="text.secondary">
              Region:&nbsp;
              <Typography component="span" fontWeight="bold">
                {country.region}
              </Typography>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography color="text.secondary">
              Population:&nbsp;
              <Typography component="span" fontWeight="bold">
                {country.population}
              </Typography>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography color="text.secondary">
              Alpha Code:&nbsp;
              <Typography component="span" fontWeight="bold">
                {country.alpha3Code}
              </Typography>
            </Typography>
          </ListItem>
        </List>
      </Grid>
      <Grid item container sm={12} md={6} sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CountryImage src={country.flag} alt={country.name}/>
        <NeighbourCountries neighbours={neighbours} selectNeighbour={selectNeighbour}/>
      </Grid>
    </Grid>
  );
};

export default CountryInfo;
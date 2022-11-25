import React from 'react';
import {List, Typography} from "@mui/material";
import {FullCountryData} from "../../types";
import CountryItem from "../CountryList/CountryItem";
import Preloader from "../Preloader/Preloader";

interface Props {
  neighbours: FullCountryData[] | null;
  selectNeighbour: (name: string) => void;
}

const NeighbourCountries: React.FC<Props> = ({neighbours, selectNeighbour}) => {
  let heading: React.ReactNode;
  let content: React.ReactNode;

  if (neighbours === null) {
    heading = <Preloader/>;
    content = null;
  } else if (neighbours.length === 0) {
    heading = 'This country doesn\'t have any neighbour.';
    content = null;
  } else {
    heading = `This country has ${neighbours.length} neighbours: `
    content = neighbours.map(country => (
      <CountryItem
        key={country.alpha3Code}
        alpha3Code={country.alpha3Code}
        flag={country.flag}
        name={country.name}
        selected={false}
        onClick={() => selectNeighbour(country.name)}
      />
    ))
  }

  return (
    <>
      <Typography
        component='div'
        padding='1em'
        color="text.secondary"
      >
        {heading}
      </Typography>
      <List sx={{
        flex: '1',
        padding: '0',
      }}>
        {content}
      </List>
    </>
  );
};

export default NeighbourCountries;
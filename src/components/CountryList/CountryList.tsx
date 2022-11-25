import React from 'react';
import {Box, List, Typography} from "@mui/material";
import CountryItem from "./CountryItem";
import {CountryBrief} from "../../types";

interface Props {
  countries: CountryBrief[];
  selectedIndex: number | null;
  selectCountry: (index: number) => void;
  heading: string;
}

const CountryList: React.FC<Props> = ({countries, selectedIndex, selectCountry, heading}) => {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Typography component='h3' sx={{
        fontSize: '1.2em',
        py: '1em',
        textAlign: 'center',
        boxShadow: '0 0 10px gainsboro'
      }}>
        {heading}
      </Typography>
      <List
        sx={{
          flex: '1',
          padding: '0',
          overflow: 'auto',
        }}
      >
        {countries.map((country, i) => (
          <CountryItem
            key={country.alpha3Code}
            alpha3Code={country.alpha3Code}
            flag={country.flag}
            name={country.name}
            onClick={() => selectCountry(i)}
            selected={selectedIndex === i}
          />
        ))}
      </List>
    </Box>
  );
};

export default CountryList;
import React from 'react';
import {Box, List, Typography} from "@mui/material";
import CountryItem from "./CountryItem";
import {CountryBrief} from "../../types";

interface Props {
  countries: CountryBrief[];
}

const CountryList: React.FC<Props> = ({countries}) => {
  return (
    <Box sx={{
      maxHeight: '100vh',
      border: '1px solid red',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography
        component='h4'
      >
        Choose a country
      </Typography>
      <List
        sx={{
          flex: '1',
          overflow: 'auto'
        }}
      >
        {countries.map(country => (
          <CountryItem
            key={country.alpha3Code}
            {...country}
          />
        ))}
      </List>
    </Box>
  );
};

export default CountryList;
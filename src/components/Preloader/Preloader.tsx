import React from 'react';
import {Box, CircularProgress} from "@mui/material";

const Preloader = () => {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress/>
    </Box>
  );
};

export default Preloader;
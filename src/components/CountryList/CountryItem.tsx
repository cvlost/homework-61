import React, {useState} from 'react';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import ImageIcon from '@mui/icons-material/ViewArrayRounded'
import type {CountryBrief} from "../../types";
import CountryImage from "./CountryImage";

const CountryItem: React.FC<CountryBrief> = ({name, alpha3Code, flag}) => {
  //const [image, setImage] = useState(new Image());



  console.log('[CountryItem] render');

  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar>
          <CountryImage src={flag} alt={name}/>
          {/*<ImageIcon />*/}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${name}`} secondary={`${alpha3Code}`} />
    </ListItemButton>
  );
};

export default React.memo(CountryItem, (prev, next) => {
  return prev.alpha3Code === next.alpha3Code;
});
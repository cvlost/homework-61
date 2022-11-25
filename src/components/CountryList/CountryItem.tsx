import React from 'react';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import CountryImage from "../CountryImage/CountryImage";

interface Props {
  name: string;
  alpha3Code: string;
  flag: string;
  onClick: React.MouseEventHandler;
  selected: boolean;
}

const CountryItem: React.FC<Props> = ({name, alpha3Code, flag, onClick, selected}) => {
  return (
    <ListItemButton onClick={onClick} selected={selected}>
      <ListItemAvatar>
        <Avatar>
          <CountryImage src={flag} alt={name} cover/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${name}`} secondary={`${alpha3Code}`}/>
    </ListItemButton>
  );
};

export default React.memo(CountryItem, (prev, next) => {
  return prev.alpha3Code === next.alpha3Code && prev.selected === next.selected;
});
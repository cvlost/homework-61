import React, {useEffect, useState} from 'react';
import ImageIcon from '@mui/icons-material/ViewArrayRounded';

interface Props {
  src: string;
  alt: string;
  cover?: boolean;
}

const coverStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover"
};

const baseStyles: React.CSSProperties = {
  maxWidth: '100%',
  display: 'block',
  boxShadow: '0 0 15px gainsboro',
  padding: '.5em'
}

const CountryImage: React.FC<Props> = ({src, alt, cover}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  return loaded ? (
    <img
      src={src}
      alt={alt}
      style={cover ? coverStyles : baseStyles}
    />
  ) : (
    <ImageIcon/>
  );
};

export default CountryImage;
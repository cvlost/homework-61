import React, {useEffect, useState} from 'react';
import ImageIcon from '@mui/icons-material/ViewArrayRounded';

interface Props {
  src: string;
  alt: string;
}

const CountryImage: React.FC<Props> = ({src, alt}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      console.log('img loaded: ');
      setLoaded(true);
    };
  }, [src]);

  const output = loaded ? (
    <img
      src={src}
      alt={alt}
      style={{width: "100%", height: "100%", display: "block", objectFit: "cover"}}
    />
  ) : (
    <ImageIcon/>
  );

  return output;
};

export default CountryImage;
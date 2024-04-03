import React, { useEffect, useState } from 'react';
import { Image, Dimensions } from 'react-native';

const ImageCustom = ({ file }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    getImageSize();
  }, []);

  const getImageSize = () => {
    Image.getSize(
      file,
      (width, height) => {
        const screenWidth = Dimensions.get('window').width - 58;
        const scaleFactor = screenWidth / width;
        const scaledHeight = height * scaleFactor;
        setImageSize({ width: '100%', height: scaledHeight });
      },
      error => {
        console.error('Error getting image size: ', error);
      },
    );
  };
  return (
    <Image
      source={{
        uri: file,
      }}
      style={{
        width: imageSize.width,
        height: imageSize.height,
        borderRadius: 10,
      }}
      resizeMode="contain"
    />
  );
};

export default ImageCustom;

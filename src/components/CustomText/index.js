import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import THEME from '../../config/theme';

const CustomText = ({style, ...rest}) => {
  return <RNText style={[styles.text, style]} {...rest} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    color: THEME.COLORS.TEXT,
  },
});

export default CustomText;

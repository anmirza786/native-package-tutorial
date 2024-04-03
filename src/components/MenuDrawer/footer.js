import React from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native'; // Import Linking from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import THEME from '../../config/theme';

function Footer() {
  // Define a function to handle link navigation
  const handleLinkPress = url => {
    Linking.openURL(url); // Open the URL in the default browser
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() =>
          handleLinkPress('https://www.facebook.com/BrailleBattery/')
        }>
        <MaterialIcons name="facebook" size={30} color={THEME.COLORS.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleLinkPress('https://www.instagram.com/braillebattery/')
        }>
        <MaterialIcons name="instagram" size={30} color={THEME.COLORS.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleLinkPress('https://www.linkedin.com/company/braille-battery/')
        }>
        <MaterialIcons name="linkedin" size={30} color={THEME.COLORS.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLinkPress('https://twitter.com/braillebattery')}>
        <MaterialIcons name="twitter" size={30} color={THEME.COLORS.WHITE} />
      </TouchableOpacity>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row', // Change justifyContent to flexDirection
    justifyContent: 'space-evenly',
  },
});

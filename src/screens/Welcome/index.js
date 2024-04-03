import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from 'react-native';
import THEME from '../../config/theme';
import generalStyle from '../../styles';
import CustomText from '../../components/CustomText';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/ScannerWelcome.png')}
        resizeMode="contain"
        style={styles.frontView}
      />
      <View>
        <Text style={styles.plainText}>
          Go and enjoy our features for free and make your life easy with us.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={generalStyle.actionBtn}>
          <CustomText style={generalStyle.actionBtnText}>
            Get Started
          </CustomText>
        </TouchableOpacity>
      </View>
      {/* <CustomText style={styles.signUpText}>
        Don't have an account?{' '}
        <CustomText
          onPress={() => navigation.navigate('SignUp')}
          style={generalStyle.strongText}>
          Sign Up
        </CustomText>
      </CustomText> */}
    </View>
  );
};

export default WelcomeScreen;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100%',
  },
  signUpText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: THEME.COLORS.HIGHLIGHT,
    width: '100%',
    padding: 10,
  },
  // logo: {
  //   width: screenWidth * 0.5, // Adjust percentage as needed
  //   height: screenWidth * 0.5,
  //   marginTop: 20,
  //   alignSelf: 'center',
  // },
  frontView: {
    width: screenWidth * 0.9, // Adjust percentage as needed
    height: screenWidth * 4 * 0.25,
    marginTop: 70,
    alignSelf: 'center',
  },
  // boldText: {
  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   color: THEME.COLORS.BLACK,
  // },
  plainText: {
    color: THEME.COLORS.BLACK,
    textAlign: 'center',
  },
});

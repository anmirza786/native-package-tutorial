import React, { useCallback, useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import THEME from '../../config/theme';
import Header from '../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomText from '../../components/CustomText';

const TermsAndConditionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const previousScreenName = route?.params?.previousScreen;
  const handleBackButton = useCallback(() => {
    if (previousScreenName) {
      navigation.replace(previousScreenName);
    }
    return true;
  }, [navigation, previousScreenName]);

  useEffect(() => {
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    // Return cleanup function to remove event listener when component unmounts
    return () => backHandler.remove();
  }, [handleBackButton]);
  return (
    <View>
      <Header />
      <CustomText style={styles.boldText}>Terms of Services</CustomText>
      <View style={styles.detailsContainer}>
        <CustomText style={styles.mediumTextNormal}>
          Welcome to DocumentScanner! By accessing this app, you agree to abide
          by these terms. To access certain features, you may need to create an
          account. Protect your password and agree to provide accurate
          information. We reserve the right to modify these terms at any time.
        </CustomText>
        <CustomText style={styles.lightText}>
          Last Updated: 2024-01-14 12:28 PM EST Data is refreshed weekly.
        </CustomText>
      </View>
    </View>
  );
};

export default TermsAndConditionScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 30,
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mediumTextNormal: {
    fontSize: 13,
    color: THEME.COLORS.PRIMARY_SECOND,
  },
  lightText: {
    color: THEME.COLORS.GRAY_DARK,
  },
});

import React, { useCallback, useEffect } from 'react';
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import THEME from '../../config/theme';
import Header from '../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserIcon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../../components/CustomText';
import generalStyle from '../../styles';

const MaintenanceScreen = () => {
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
      <View style={generalStyle.paddingHorizontal}>
        <Header />
        <CustomText style={styles.boldText}>Maintenance</CustomText>
      </View>
      <View style={styles.detailsContainer}>
        <CustomText style={[generalStyle.paddingHorizontal, styles.mediumText]}>
          Maintenance Schedule
        </CustomText>

        <View
          style={[generalStyle.paddingHorizontal, styles.higlightedContainer]}
        >
          <CustomText style={styles.smallText}>Annual</CustomText>
          <CustomText style={styles.smallTextNormal}>What is listed</CustomText>
        </View>
        <Divider width={1} />
        <View style={[generalStyle.paddingHorizontal, styles.plainContainer]}>
          <CustomText style={styles.smallText}>Five Year</CustomText>
          <CustomText style={styles.smallTextNormal}>What is listed</CustomText>
        </View>
        <Divider width={1} />
        <View
          style={[generalStyle.paddingHorizontal, styles.higlightedContainer]}
        >
          <CustomText style={styles.smallText}>Ten Year</CustomText>
          <CustomText style={styles.smallTextNormal}>What is listed</CustomText>
        </View>
        <Divider width={1} />
        <View style={generalStyle.paddingHorizontal}>
          <TouchableOpacity
            style={[generalStyle.paddingHorizontal, styles.dealerCard]}
            onPress={() =>
              navigation.replace('DealerInfo', {
                previousScreen: 'Maintenance',
              })
            }
          >
            <CustomText style={styles.dealerCardText}>
              Contact Your Local Authorized Service Partner For Support
            </CustomText>
            <View style={styles.innerCircle}>
              <UserIcon name="person" size={30} color={THEME.COLORS.PRIMARY} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MaintenanceScreen;

const styles = StyleSheet.create({
  higlightedContainer: {
    backgroundColor: THEME.COLORS.HIGHLIGHT,
    paddingVertical: 20,
  },
  plainContainer: {
    paddingVertical: 20,
  },
  dealerIconContainer: {
    alignItems: 'center',
    gap: 10,
  },
  dealerIconContainerText: {
    color: THEME.COLORS.WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
  dealerCard: {
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  dealerCardText: {
    color: THEME.COLORS.WHITE,
    maxWidth: 150,
    fontSize: 15,
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.COLORS.GRAY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'column',
    // gap: 20,
    marginTop: 20,
    flex: 1,
  },
  boldText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },
  smallText: {
    fontSize: 17,
    color: THEME.COLORS.PRIMARY,
    fontWeight: '700',
  },
  smallTextNormal: {
    fontSize: 17,
    color: THEME.COLORS.PRIMARY,
  },
  mediumText: {
    fontSize: 20,
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

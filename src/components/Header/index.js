import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackArrowIcon from 'react-native-vector-icons/FontAwesome6';
// import MenuIcon from 'react-native-vector-icons/Feather';
import THEME from '../../config/theme';
import { useDispatch, useSelector } from 'react-redux';
// import {setToggleMenu} from '../../reducers/slices/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ isChild = false, headerText }) => {
  const [accessToken, setAccessToken] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const previousScreenName = route?.params?.previousScreen;
  const screenName = route?.name;
  const userData = useSelector(state => state.User.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAccessToken(token);
      }
    })();
  }, []);

  const getHeaderChild = useCallback(() => {
    return (userData && !isChild) || (accessToken && !isChild) ? (
      <>
        {/* <TouchableOpacity
          hitSlop={30}
          onPress={() => dispatch(setToggleMenu(true))}
          style={styles.icon}>
          <MenuIcon name="menu" size={20} color={THEME.COLORS.TEXT} />
        </TouchableOpacity> */}
        <Text style={styles.screenName}>{screenName}</Text>
      </>
    ) : (
      <>
        <TouchableOpacity
          hitSlop={30}
          onPress={() =>
            previousScreenName
              ? navigation.replace(previousScreenName)
              : navigation.goBack()
          }
          style={styles.icon}
        >
          <BackArrowIcon
            name="arrow-left"
            size={20}
            color={THEME.COLORS.TEXT}
          />
        </TouchableOpacity>
        {headerText ? (
          <Text style={{ color: 'black', fontSize: 16 }}>{headerText}</Text>
        ) : null}
      </>
    );
  }, [
    accessToken,
    dispatch,
    isChild,
    navigation,
    previousScreenName,
    userData,
  ]);

  return (
    <View style={styles.container}>
      {getHeaderChild()}
      {/* <Image
        source={require('../../assets/images/electrafylogo.png')}
        style={styles.logo}
      /> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 0,
  },
  screenName: {
    fontSize: 20,
    color: '#000000',
  },
  // logo: {
  //   width: 177,
  //   height: 49,
  // },
});

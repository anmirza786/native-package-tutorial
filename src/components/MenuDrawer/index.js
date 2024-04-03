import React, { useEffect, useRef } from 'react';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleMenu } from '../../reducers/slices/ThemeSlice';
import THEME from '../../config/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LogoutIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import {Avatar} from '@rneui/themed';
import { setUserData } from '../../reducers/slices/UserSlice';
import CustomText from '../CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerNavigationData } from '../../config/constants';
import Footer from './footer';

const MenuDrawer = ({ children }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.User.userData);
  const drawer = useRef(null);
  const route = useRoute();
  const currentScreenName = route.name;
  const toggleMenu = useSelector(state => state.Theme.toggleMenu);
  useEffect(() => {
    if (toggleMenu) {
      drawer.current.openDrawer();
    } else {
      drawer.current.closeDrawer();
    }
  }, [toggleMenu]);

  const handleNavigation = routeName => {
    dispatch(setToggleMenu(false));
    navigation.replace(routeName, { previousScreen: currentScreenName });
  };

  const handleLogout = () => {
    dispatch(setToggleMenu(false));
    dispatch(setUserData(null));
    AsyncStorage.removeItem('token');
    navigation.navigate('Welcome');
  };
  const navigationView = () => (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {/* <Avatar
          size={40}
          rounded
          title={userData?.name ? userData.name.charAt(0).toUpperCase() : '-'}
          containerStyle={{backgroundColor: THEME.COLORS.PRIMARY_SECOND}}
          onPress={() => handleNavigation('UpdateProfile')}
        /> */}
        <CustomText
          style={styles.userText}
          onPress={() => handleNavigation('UpdateProfile')}
        >
          {userData?.name ? userData.name : '-'}
        </CustomText>
        <CustomText>{userData?.city ? userData.city.label : '-'}</CustomText>
      </View>
      <View style={styles.navigationContainer}>
        <View>
          {DrawerNavigationData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.navigationList}
                onPress={() => handleNavigation(item.navigationPath)}
              >
                <MaterialIcon
                  name={item.iconName}
                  size={25}
                  color={THEME.COLORS.YELLOW}
                />
                <CustomText style={styles.navigationText}>
                  {item.title}
                </CustomText>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <LogoutIcon name="logout" size={23} color={THEME.COLORS.YELLOW} />
            <CustomText style={styles.navigationText}>Logout</CustomText>
          </TouchableOpacity>
        </View>
        <View>
          <Footer />
        </View>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
      onDrawerClose={() => dispatch(setToggleMenu(false))}
    >
      {children}
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  navigationList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navigationText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLORS.WHITE,
    paddingVertical: 10,
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userContainer: {
    backgroundColor: THEME.COLORS.GRAY_LIGHT,
    paddingVertical: 50,
    paddingLeft: 50,
  },
  navigationContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: THEME.COLORS.PRIMARY,
  },
});

export default MenuDrawer;

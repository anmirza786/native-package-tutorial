import React, { useCallback, useEffect } from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import THEME from '../../config/theme';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomText from '../../components/CustomText';
import { setUserData } from '../../reducers/slices/UserSlice';
import { dispatch } from '../../reducers/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByToken } from '../../shared/api';
import {
  setFilesData,
  setScannedDocuments,
} from '../../reducers/slices/FilesDataSlice';

const ProfileScreen = () => {
  const userData = useSelector(state => state.User.userData);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const route = useRoute();

  const previousScreenName = route?.params?.previousScreen;
  const handleBackButton = useCallback(() => {
    if (previousScreenName) {
      navigation.replace(previousScreenName, { previousScreen: route.name });
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

  const handleLogout = async () => {
    dispatch(setUserData(null));
    dispatch(setFilesData(null));
    dispatch(setScannedDocuments([]));
    await AsyncStorage.removeItem('token');
    navigation.navigate('Welcome');
  };
  useEffect(() => {
    (async () => {
      await getUserByToken();
    })();
  }, [isFocused]);

  return (
    <View>
      <Header />
      <View>
        <Text style={styles.displayLabelText}>Name</Text>
        <View style={styles.fieldContentWrapper}>
          <SimpleLineIcons name="user" size={30} color={THEME.COLORS.GRAY} />
          <Text style={styles.fieldContent}>{userData?.name}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.displayLabelText}>Email Address</Text>
        <View style={styles.fieldContentWrapper}>
          <MaterialIcons
            name="mail-outline"
            size={30}
            color={THEME.COLORS.GRAY}
          />
          <Text style={styles.fieldContent}>{userData?.email}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.displayLabelText}>Phone</Text>
        <View style={styles.fieldContentWrapper}>
          <SimpleLineIcons name="phone" size={30} color={THEME.COLORS.GRAY} />
          <Text style={styles.fieldContent}>
            {userData?.phoneNumber ?? '+123 123 1234 23'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: THEME.COLORS.GRAY,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <MaterialIcons name="logout" size={30} color={THEME.COLORS.GRAY_DARK} />
        <Text style={{ color: THEME.COLORS.GRAY_DARK }}>Signout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  displayLabelText: {
    fontWeight: 'bold',
    color: THEME.COLORS.BLACK,
    marginBottom: 5,
  },
  fieldContentWrapper: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY,
    borderRadius: 5,
    gap: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldContent: { color: THEME.COLORS.GRAY },
  button: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderColor: THEME.COLORS.GRAY_DARK,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

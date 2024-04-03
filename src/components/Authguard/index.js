import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const Authguard = ({ children }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserByToken = useCallback(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Files');
      } else {
        navigation.navigate('Welcome');
      }
    })();
  }, [dispatch, navigation]);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  return children;
};

export default Authguard;

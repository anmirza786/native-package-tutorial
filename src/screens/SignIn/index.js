import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import generalStyle from '../../styles';
import Header from '../../components/Header';
import axios from 'axios';
import { errorMessageHandler, userDataFormatter } from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../reducers/slices/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../components/CustomText';
import { get } from 'lodash';
import { setBtnLoader } from '../../reducers/slices/ThemeSlice';
import THEME from '../../config/theme';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .transform(originalValue => originalValue.toLowerCase())
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const btnLoader = useSelector(state => state.Theme.btnLoader);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      dispatch(setBtnLoader(true));
      const payload = {
        email: values.email,
        password: values.password,
      };
      const response = await axios.post('/login', payload);
      if (get(response, 'status', false) && response?.data) {
        dispatch(setUserData(userDataFormatter(response.data)));
        AsyncStorage.setItem('token', response.data?.access_token);
        navigation.navigate('Files');
        resetForm();
      } else {
        errorMessageHandler(response);
      }
    } catch (error) {
      console.log('Sign In Error', error);
    } finally {
      dispatch(setBtnLoader(false));
    }
  };

  return (
    <View>
      <Header />
      <KeyboardAvoidingView
        enabled={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.formContainer}>
                <Image
                  source={require('../../assets/images/ScannerWelcome.png')}
                  resizeMode="contain"
                  style={styles.logoPlacing}
                />
                <View>
                  <Text style={styles.label}>Email</Text>
                  <View style={generalStyle.textInputWraper}>
                    <MaterialIcon
                      name="mail-outline"
                      color={THEME.COLORS.GRAY}
                      size={20}
                    />
                    <TextInput
                      style={generalStyle.wrappedInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email"
                      placeholderTextColor={THEME.COLORS.GRAY}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.email && errors.email ? (
                    <CustomText style={styles.error}>{errors.email}</CustomText>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.label}>Password</Text>
                  <View style={generalStyle.textInputWraper}>
                    <MaterialIcon
                      name="lock-outline"
                      color={THEME.COLORS.GRAY}
                      size={20}
                    />
                    <TextInput
                      style={generalStyle.wrappedInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Password"
                      placeholderTextColor={THEME.COLORS.GRAY}
                      secureTextEntry={passwordVisible}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <MaterialCommunityIcons
                          name="eye-outline"
                          color={THEME.COLORS.GRAY}
                          size={20}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="eye-off-outline"
                          color={THEME.COLORS.GRAY}
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password ? (
                    <CustomText style={styles.error}>
                      {errors.password}
                    </CustomText>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={
                  btnLoader
                    ? generalStyle.actionBtnLight
                    : generalStyle.actionBtn
                }
                disabled={btnLoader}
              >
                {btnLoader ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <CustomText style={generalStyle.actionBtnText}>
                    Sign In
                  </CustomText>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <CustomText style={styles.registerText}>
          Dont have an account?{' '}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}> */}
          {/* </TouchableOpacity> */}
          <Text
            style={styles.register}
            onPress={() => navigation.navigate('SignUp')}
          >
            Register
          </Text>
        </CustomText>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: THEME.COLORS.BLACK,
  },
  logoPlacing: {
    width: 90, // Adjust percentage as needed
    height: 90,
    alignSelf: 'center',
    marginVertical: 10,
  },
  registerText: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
  },
  register: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
    color: THEME.COLORS.PRIMARY,
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
  formContainer: {
    paddingVertical: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  formHeadText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
  },
});

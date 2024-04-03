import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ToastAndroid,
  Text,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import generalStyle from '../../styles';
import THEME from '../../config/theme';
import Header from '../../components/Header';
import axios from 'axios';
import { errorMessageHandler } from '../../helper';
import { ActivityIndicator } from 'react-native';
import CustomText from '../../components/CustomText';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { setBtnLoader } from '../../reducers/slices/ThemeSlice';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .transform(originalValue => originalValue.toLowerCase())
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const btnLoader = useSelector(state => state.Theme.btnLoader);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      dispatch(setBtnLoader(true));
      const payload = {
        name: values.name,
        email: values.email,
        phone_number: values.phone,
        password: values.password,
        password_confirmation: values.confirmPassword,
      };

      const response = await axios.post('/signup', payload);
      if (get(response, 'status', false) && response?.data) {
        ToastAndroid.show('Signed Up Successfully!', ToastAndroid.SHORT);
        navigation.navigate('SignIn');
        resetForm();
      } else {
        errorMessageHandler(response);
      }
    } catch (error) {
      console.log('SignUp Error', error);
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
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.formContainer}>
                {/* <CustomText style={styles.formHeadText}>
                  Create an Account
                </CustomText> */}
                <View style={styles.headerContainer}>
                  <Text style={styles.formHeadText}>
                    Let’s Create an Account
                  </Text>
                  <Text style={styles.formSubHeadText}>
                    Unlock Your Productively Potential!
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Name</Text>
                  <View style={generalStyle.textInputWraper}>
                    <SimpleLineIcon
                      name="user"
                      color={THEME.COLORS.GRAY}
                      size={20}
                    />
                    <TextInput
                      style={generalStyle.wrappedInput}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      placeholder="Name"
                      placeholderTextColor={THEME.COLORS.GRAY}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.name && errors.name ? (
                    <CustomText style={styles.error}>{errors.name}</CustomText>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.label}>Phone</Text>
                  <View style={generalStyle.textInputWraper}>
                    <SimpleLineIcon
                      name="phone"
                      color={THEME.COLORS.GRAY}
                      size={20}
                    />
                    <TextInput
                      nativeID="phone"
                      style={generalStyle.wrappedInput}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      placeholder="Phone"
                      placeholderTextColor={THEME.COLORS.GRAY}
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.phone && errors.phone ? (
                    <CustomText style={styles.error}>{errors.phone}</CustomText>
                  ) : null}
                </View>
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
                <View>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={generalStyle.textInputWraper}>
                    <MaterialIcon
                      name="lock-outline"
                      color={THEME.COLORS.GRAY}
                      size={20}
                    />
                    <TextInput
                      style={generalStyle.wrappedInput}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      placeholder="Confirm Password"
                      placeholderTextColor={THEME.COLORS.GRAY}
                      secureTextEntry={confirmPasswordVisible}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? (
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

                  {touched.confirmPassword && errors.confirmPassword ? (
                    <CustomText style={styles.error}>
                      {errors.confirmPassword}
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
                    Continue
                  </CustomText>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: THEME.COLORS.BLACK,
  },
  phone: {
    marginLeft: 5,
    color: THEME.COLORS.PRIMARY,
  },
  countryInput: {
    height: 50,
    justifyContent: 'center',
    color: THEME.COLORS.GRAY_DARK,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY_DARK,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 3,
  },
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },
  btn: {
    position: 'fixed',
    bottom: 0,
  },
  formContainer: {
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  headerContainer: {
    marginVertical: 30,
  },
  formHeadText: {
    fontSize: 25,
    color: THEME.COLORS.BLACK,
    fontWeight: 'bold',
  },
  formSubHeadText: {
    fontSize: 16,
    color: THEME.COLORS.GRAY,
  },
  formFooterText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
  },
});

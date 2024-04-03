import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  // ToastAndroid,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import generalStyle from '../../styles';
import Header from '../../components/Header';
// import axios from 'axios';
// import {errorMessageHandler} from '../../helper';
import { ActivityIndicator } from 'react-native';
import CustomText from '../../components/CustomText';

import { useDispatch, useSelector } from 'react-redux';
import { setBtnLoader } from '../../reducers/slices/ThemeSlice';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const btnLoader = useSelector(state => state.Theme.btnLoader);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFormSubmit = async (values, { resetForm }) => {
    dispatch(setBtnLoader(true));
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('SignIn');
    }, 3000);
    dispatch(setBtnLoader(false));
    // try {
    // dispatch(setBtnLoader(true));
    //   const payload = {
    //     password: values.password,
    //     password_confirmation: values.confirmPassword,
    //   };
    //   const res = await axios.post('/signup', payload);
    //   if (res.data?.status) {
    //     ToastAndroid.show('Signed Up Successfully!', ToastAndroid.SHORT);
    //     navigation.navigate('SignIn');
    //     resetForm();
    //   } else {
    //     const errArr = errorMessageHandler(res.data);
    //     errArr.forEach((errorMessage, index) => {
    //       setTimeout(() => {
    //         ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    //       }, index * 500);
    //     });
    //   }
    // } catch (err) {
    //   console.log('SignUp Error', err);
    // } finally {
    // dispatch(setBtnLoader(false));
    // }
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
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.formContainer}>
                <View style={styles.formContainer}>
                  <CustomText style={styles.formHeadText}>
                    Enter New Password
                  </CustomText>
                  <CustomText style={styles.smallText}>
                    Your new password must be different from previously used
                    password.
                  </CustomText>
                  <TextInput
                    style={generalStyle.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Password"
                    secureTextEntry
                  />
                  {touched.password && errors.password ? (
                    <CustomText style={styles.error}>
                      {errors.password}
                    </CustomText>
                  ) : null}

                  <TextInput
                    style={generalStyle.textInput}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry
                  />
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
      {/* {modalVisible ? (
        <AllertModal
          setModalVisible={setModalVisible}
          variant="success"
          message="Your account is ready to use. You will be redirected to the Login in a Few seconds."
        />
      ) : null} */}
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  smallText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    paddingVertical: 16,
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

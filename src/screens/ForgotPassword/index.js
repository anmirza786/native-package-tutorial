import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  // ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import generalStyle from '../../styles';
import Header from '../../components/Header';
// import axios from 'axios';
// import {errorMessageHandler} from '../../helper';
import CustomText from '../../components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {setBtnLoader} from '../../reducers/slices/ThemeSlice';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .transform(originalValue => originalValue.toLowerCase())
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email format')
    .required('Email is required'),
});

const ForgotPasswordScreen = ({isChild, navigation}) => {
  const dispatch = useDispatch();
  const btnLoader = useSelector(state => state.Theme.btnLoader);

  const handleFormSubmit = async (values, {resetForm}) => {
    dispatch(setBtnLoader(true));
    navigation.navigate('OTP');
    dispatch(setBtnLoader(false));
    // try {
    //   dispatch(setBtnLoader(true));
    //   const payload = {
    //     email: values.email,
    //   };
    //   const res = await axios.post('/forgot_password', payload);
    //   if (res.data?.status) {
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
    //   console.log('Forgot password Error', err);
    // } finally {
    //   dispatch(setBtnLoader(false));
    // }
  };

  return (
    <View>
      <Header isChild={isChild} />
      <KeyboardAvoidingView
        enabled={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}>
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
                <CustomText style={styles.formHeadText}>
                  Forgot Password
                </CustomText>
                <CustomText style={styles.smallText}>
                  Enter your email and will send you instructions on how to
                  reset it.
                </CustomText>
                <TextInput
                  style={generalStyle.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email ? (
                  <CustomText style={styles.error}>{errors.email}</CustomText>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={
                  btnLoader
                    ? generalStyle.actionBtnLight
                    : generalStyle.actionBtn
                }
                disabled={btnLoader}>
                {btnLoader ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <CustomText style={generalStyle.actionBtnText}>
                    Send
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

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  smallText: {
    textAlign: 'center',
    paddingHorizontal: 30,
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

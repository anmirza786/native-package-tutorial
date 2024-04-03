import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  // ToastAndroid,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import generalStyle from '../../styles';
import Header from '../../components/Header';
// import axios from 'axios';
// import {errorMessageHandler} from '../../helper';
import CustomText from '../../components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {setBtnLoader} from '../../reducers/slices/ThemeSlice';
// import {setBtnLoader} from '../../reducers/slices/ThemeSlice';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTPScreen = ({isChild, navigation}) => {
  const dispatch = useDispatch();
  const btnLoader = useSelector(state => state.Theme.btnLoader);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [error, setError] = useState('');

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (!value && index > 0) {
      // If the current input is empty and there's a previous input
      // Clear the content of the current input and move focus to the previous input
      const prevIndex = index - 1;
      newOtp[index] = '';
      setOtp(newOtp);
      inputRefs[prevIndex].current.focus();
    }
  };

  const handleVerifyOtp = () => {
    dispatch(setBtnLoader(true));
    const enteredOtp = otp.join('');
    if (enteredOtp === '1234') {
      navigation.navigate('ResetPassword');
      console.log('OTP verified successfully');
      dispatch(setBtnLoader(false));
    } else {
      setError('Invalid OTP. Please try again.');
      dispatch(setBtnLoader(false));
    }
    // navigation.navigate('OTP');
    // try {
    //  dispatch(setBtnLoader(true));
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
    // dispatch(setBtnLoader(false));
    // }
  };

  return (
    <View>
      <Header isChild={isChild} />
      <KeyboardAvoidingView
        enabled={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <View style={styles.formContainer}>
            <CustomText style={styles.formHeadText}>Verify Code</CustomText>
            <CustomText style={styles.smallText}>
              Please enter the 4 digit code that sent to your email address.
            </CustomText>
            <View>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={inputRefs[index]}
                    style={styles.input}
                    placeholder="*"
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={value => handleOtpChange(index, value)}
                  />
                ))}
              </View>
              {error ? (
                <CustomText style={styles.error}>{error}</CustomText>
              ) : null}
            </View>
            <CustomText style={styles.resendText}>
              If you don't receive code!{' '}
              <CustomText
                onPress={() => navigation.navigate('SignUp')}
                style={generalStyle.strongText}>
                Resend
              </CustomText>
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={handleVerifyOtp}
            style={
              btnLoader ? generalStyle.actionBtnLight : generalStyle.actionBtn
            }
            disabled={btnLoader}>
            {btnLoader ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <CustomText style={generalStyle.actionBtnText}>Verify</CustomText>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  resendText: {
    fontSize: 14,
    alignSelf: 'center',
  },
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
    marginRight: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});

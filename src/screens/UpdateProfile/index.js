import React, {useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  // ToastAndroid,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import generalStyle from '../../styles';
import THEME from '../../config/theme';
import Header from '../../components/Header';
// import api from '../../api';
// import {errorMessageHandler} from '../../helper';
import {ActivityIndicator} from 'react-native';
// import CountryPicker from 'react-native-country-picker-modal';
import {useDispatch, useSelector} from 'react-redux';
// import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BackHandler} from 'react-native';
// import {Avatar} from '@rneui/themed';
import CustomText from '../../components/CustomText';
import {Dropdown} from 'react-native-element-dropdown';
import {getCitiesByStateId} from '../../shared/api';
import {setBtnLoader} from '../../reducers/slices/ThemeSlice';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .transform(originalValue => originalValue.toLowerCase())
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email format')
    .required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  country: yup.object().required('Country is required'),
  state: yup.object().required('State is required'),
  city: yup.object().required('City is required'),
  address: yup.string().required('Address is required'),
  postalCode: yup.string().required('Postal Code is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const UpdateProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.User.userData);
  const countries = useSelector(state => state.MasterData.countries);
  const states = useSelector(state => state.MasterData.states);
  const cities = useSelector(state => state.MasterData.cities);
  const btnLoader = useSelector(state => state.Theme.btnLoader);

  // const [image, setImage] = useState(null);
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

  // const uploadHandler = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     // eslint-disable-next-line no-shadow
  //     .then(async image => {
  //       if (image?.path) {
  //         setImage(image.path);
  //         // setAvater(image.path);

  //         // await apiProfileAvatarUpload(id, image?.path, dispatch);
  //       }
  //     })
  //     .catch(err => {
  //       console.log('Image Picker Error =>', err);
  //     });
  // };
  const handleFormSubmit = async (values, {resetForm}) => {
    try {
      dispatch(setBtnLoader(true));
      // const payload = {
      // first_name: values.firstName,
      // last_name: values.lastName,
      // email: values.email,
      // phone_with_cc: `+${values.country.callingCode}${values.phoneNumber}`,
      // phone_without_cc: values.phoneNumber,
      // country_id: 1,
      // state_id: 1,
      // city_id: 1,
      // password: values.password,
      // password_confirmation: values.confirmPassword,
      // };
      // const res = await api.post('/signup', payload);
      // if (res.data?.status) {
      //   ToastAndroid.show('Signed Up Successfully!', ToastAndroid.SHORT);
      //   navigation.navigate('SignIn');
      //   resetForm();
      // } else {
      //   const errArr = errorMessageHandler(res.data);
      //   errArr.forEach((errorMessage, index) => {
      //     setTimeout(() => {
      //       ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      //     }, index * 500);
      //   });
      // }
    } catch (err) {
      console.log('SignUp Error', err);
    } finally {
      dispatch(setBtnLoader(false));
    }
  };

  useEffect(() => {
    if (userData?.state) {
      getCitiesByStateId(userData.state.value);
    }
  }, [userData]);

  return (
    <View>
      <Header />
      <KeyboardAvoidingView
        enabled={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Formik
          initialValues={{
            firstName: userData?.firstName ? userData.firstName : '',
            lastName: userData?.lastName ? userData.lastName : '',
            email: userData?.email ? userData.email : '',
            phoneNumber: userData?.phoneNumber ? userData.phoneNumber : '',
            country: userData?.country ? userData.country : null,
            password: '',
            address: userData?.address ? userData.address : '',
            state: userData?.state ? userData.state : null,
            city: userData?.city ? userData.city : null,
            postalCode: userData?.postalCode ? userData.postalCode : '',
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}>
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
                <CustomText style={styles.formHeadText}>
                  Update Profile
                </CustomText>
                {/* {image ? (
                  <Avatar
                    size={120}
                    rounded
                    source={{
                      uri: image,
                    }}
                    containerStyle={styles.avatar}
                    onPress={uploadHandler}
                  />
                ) : (
                  <Avatar
                    size={120}
                    rounded
                    title={
                      userData?.name
                        ? userData.name.charAt(0).toUpperCase()
                        : '-'
                    }
                    containerStyle={styles.avatar}
                    onPress={uploadHandler}
                  />
                )} */}
                <TextInput
                  style={generalStyle.textInput}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder="First Name"
                />
                {touched.firstName && errors.firstName ? (
                  <CustomText style={styles.error}>
                    {errors.firstName}
                  </CustomText>
                ) : null}
                <TextInput
                  style={generalStyle.textInput}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder="Last Name"
                />
                {touched.lastName && errors.lastName ? (
                  <CustomText style={styles.error}>
                    {errors.lastName}
                  </CustomText>
                ) : null}
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
                <TextInput
                  style={generalStyle.textInput}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  placeholder="Phone number"
                  keyboardType="numeric"
                  maxLength={13}
                />
                {touched.phoneNumber && errors.phoneNumber ? (
                  <CustomText style={styles.error}>
                    {errors.phoneNumber}
                  </CustomText>
                ) : null}
                {/* <CountryPicker
                  countryCode={values.country && values.country.cca2}
                  withCallingCode
                  withCountryNameButton
                  withFilter
                  withEmoji
                  containerButtonStyle={[
                    generalStyle.textInput,
                    styles.countryInput,
                  ]}
                  onSelect={country => {
                    console.log(country);
                    setFieldValue('country', country);
                  }}
                /> */}
                {/* <View style={styles.phoneInput}>
                  <Image
                    source={require('../../assets/images/united-states.png')}
                    style={styles.image}
                  />
                  <TextInput
                    style={styles.phone}
                    editable={false}
                    value="United States"
                  />
                </View> */}
                {/* {touched.country && errors.country && (
                  <CustomText style={styles.error}>{errors.country}</CustomText>
                )} */}
                {/* <View style={styles.phoneInput}>
                  {values.country && (
                  <CustomText style={styles.prefix}>
                    {`+${values.country.callingCode}`}
                    +1
                  </CustomText>
                  )}
                </View> */}
                {/* )} */}
                <Dropdown
                  style={generalStyle.dropDown.dropdown}
                  placeholderStyle={generalStyle.dropDown.placeholderStyle}
                  selectedTextStyle={generalStyle.dropDown.selectedTextStyle}
                  inputSearchStyle={generalStyle.dropDown.inputSearchStyle}
                  data={countries.filter(
                    state => state.label === 'United States',
                  )}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  searchPlaceholder="Search..."
                  value={values.country ? values.country.value : null}
                  onChange={item => {
                    setFieldValue('country', item);
                  }}
                  placeholder="Country"
                />
                {touched.country && errors.country ? (
                  <CustomText style={styles.error}>{errors.country}</CustomText>
                ) : null}
                <Dropdown
                  style={generalStyle.dropDown.dropdown}
                  placeholderStyle={generalStyle.dropDown.placeholderStyle}
                  selectedTextStyle={generalStyle.dropDown.selectedTextStyle}
                  inputSearchStyle={generalStyle.dropDown.inputSearchStyle}
                  data={states}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  searchPlaceholder="Search..."
                  value={values.state ? values.state.value : null}
                  onChange={item => {
                    setFieldValue('state', item);
                    getCitiesByStateId(item.value);
                  }}
                  placeholder="State"
                />
                {touched.state && errors.state ? (
                  <CustomText style={styles.error}>{errors.state}</CustomText>
                ) : null}
                <Dropdown
                  style={generalStyle.dropDown.dropdown}
                  placeholderStyle={generalStyle.dropDown.placeholderStyle}
                  selectedTextStyle={generalStyle.dropDown.selectedTextStyle}
                  inputSearchStyle={generalStyle.dropDown.inputSearchStyle}
                  data={cities}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  searchPlaceholder="Search..."
                  value={values.city ? values.city.value : null}
                  onChange={item => {
                    setFieldValue('city', item);
                  }}
                  placeholder="City"
                />
                {touched.city && errors.city ? (
                  <CustomText style={styles.error}>{errors.city}</CustomText>
                ) : null}
                <TextInput
                  style={generalStyle.textInput}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  placeholder="Address"
                />
                {touched.address && errors.address ? (
                  <CustomText style={styles.error}>{errors.address}</CustomText>
                ) : null}
                <TextInput
                  style={generalStyle.textInput}
                  onChangeText={handleChange('postalCode')}
                  onBlur={handleBlur('postalCode')}
                  value={values.postalCode}
                  placeholder="Postal Code"
                />
                {touched.postalCode && errors.postalCode ? (
                  <CustomText style={styles.error}>
                    {errors.postalCode}
                  </CustomText>
                ) : null}
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
                    Update
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

export default UpdateProfile;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 0,
    marginLeft: 80,
  },
  avatar: {
    backgroundColor: THEME.COLORS.PRIMARY,
    marginBottom: 30,
    alignSelf: 'center',
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
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 5,
  },
  formHeadText: {
    color: THEME.COLORS.PRIMARY,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  formFooterText: {
    color: THEME.COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: 30,
  },
  error: {
    color: 'red',
  },
});

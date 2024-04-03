import {ToastAndroid} from 'react-native';

const errorMessageHandler = responseData => {
  let errorArray = [];
  if (responseData?.errors?.length) {
    responseData.errors.map(e => errorArray.push(e.message));
  } else if (responseData?.message) {
    errorArray.push(responseData.message);
  } else {
    errorArray.push('Something went wrong!');
  }
  errorArray.forEach((errorMessage, index) => {
    setTimeout(() => {
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }, index * 3000);
  });
};

const userDataFormatter = responseData => {
  if (responseData) {
    return {
      id: responseData.id,
      type: responseData.type,
      name: responseData.name,
      firstName: responseData.first_name,
      lastName: responseData.last_name,
      email: responseData.email,
      phoneNumber: responseData.phone_number,
      phoneNumberCC: responseData.phone_cc,
      country: {
        label: responseData.country?.name,
        value: responseData.country?.id,
      },
      state: {
        label: responseData.state?.name,
        value: responseData.state?.id,
      },
      city: {
        label: responseData.city?.name,
        value: responseData.city?.id,
      },
      address: responseData.address,
      streetAddress: responseData.street,
      postalCode: responseData.zip_code,
    };
  }
};

export {errorMessageHandler, userDataFormatter};

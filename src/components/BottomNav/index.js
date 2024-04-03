import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import THEME from '../../config/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import DocumentScanner from 'react-native-document-scanner-plugin';
import { dispatch } from '../../reducers/store';
import { setScannedDocuments } from '../../reducers/slices/FilesDataSlice';

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const screenName = route?.name;
  const renderButtonStyles = routeName => {
    if (screenName === routeName) {
      return styles.btnActive;
    }
    return styles.btnInActive;
  };

  const renderButtonTextStyles = routeName => {
    if (routeName.includes(screenName)) {
      return THEME.COLORS.PRIMARY;
    }
    return THEME.COLORS.GRAY;
  };
  const scanDocument = async () => {
    // prompt user to accept camera permission request if they haven't already
    // if (
    //   Platform.OS === 'android' &&
    //   (await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.CAMERA,
    //   )) !== PermissionsAndroid.RESULTS.GRANTED
    // ) {
    //   Alert.alert(
    //     'Error',
    //     'User must grant camera permissions to use document scanner.',
    //   );
    //   return;
    // }
    // // start the document scanner
    // const { scannedImages } = await DocumentScanner.scanDocument({
    //   croppedImageQuality: 50,
    // });
    // // get back an array with scanned image file paths
    // if (scannedImages.length > 0) {
    //   // set the img src, so we can view the first scanned image
    //   // setScannedImage(prevDocuments => [...prevDocuments, ...scannedImages]);
    //   dispatch(setScannedDocuments(scannedImages));
    navigation.navigate('DocScanner', { previousScreen: screenName });
    // }
  };
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={renderButtonStyles('Files')}
        onPress={() =>
          navigation.navigate('Files', { previousScreen: screenName })
        }
      >
        <MaterialCommunityIcons
          name="file-document-outline"
          size={20}
          color={renderButtonTextStyles(['Files', 'FileViewer'])}
        />
        <Text
          style={{ color: renderButtonTextStyles(['Files', 'FileViewer']) }}
        >
          File
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cameraButton}
        // onPress={() => navigation.navigate('Scanner')}
        onPress={scanDocument}
      >
        <MaterialCommunityIcons
          name="camera"
          size={35}
          color={THEME.COLORS.WHITE}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={renderButtonStyles('Account')}
        onPress={() =>
          navigation.navigate('Account', { previousScreen: screenName })
        }
      >
        <SimpleLineIcons
          name="user"
          size={20}
          color={renderButtonTextStyles(['Account'])}
        />
        <Text style={{ color: renderButtonTextStyles(['Account']) }}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: 80,
    backgroundColor: THEME.COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 20,
    bottom: 0,
    borderTopColor: THEME.COLORS.GRAY,
    borderTopWidth: 1,
  },
  cameraButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnActive: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: THEME.COLORS.PRIMARY,
    borderBottomWidth: 1,
  },
  btnInActive: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNav;

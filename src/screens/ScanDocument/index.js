import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
// import DocumentScanner from 'react-native-document-scanner-plugin';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import axios from 'axios';
import { dispatch } from '../../reducers/store';
import { setBtnLoader } from '../../reducers/slices/ThemeSlice';
import { useSelector } from 'react-redux';
import { MenuView } from '@react-native-menu/menu';
import THEME from '../../config/theme';
import generalStyle from '../../styles';
import { setScannedDocuments } from '../../reducers/slices/FilesDataSlice';
import Toast from 'react-native-toast-message';
import { get } from 'lodash';
import ImageCustom from '../../components/CustomImage/ImageCustom';

const ScanDocumentScreen = ({ navigation }) => {
  const scannedImage = useSelector(state => state.FilesData.scannedDocuments);
  const btnLoader = useSelector(state => state.Theme.btnLoader);
  const scheme = useColorScheme();

  const scanDocument = async id => {
    // prompt user to accept camera permission request if they haven't already
    if (
      Platform.OS === 'android' &&
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )) !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert(
        'Error',
        'User must grant camera permissions to use document scanner.',
      );
      return;
    }
    // start the document scanner
    // const { scannedImages } = await DocumentScanner.scanDocument({
    //   maxNumDocuments: 1,
    //   croppedImageQuality: 50,
    // });
    // // get back an array with scanned image file paths
    // if (scannedImages.length > 0) {
    //   // set the img src, so we can view the first scanned image
    //   const documents = [...scannedImage];
    //   documents[id] = scannedImages[0];
    //   dispatch(setScannedDocuments(documents));
    // }
  };

  const handleUpload = async () => {
    dispatch(setBtnLoader(true));
    try {
      const formData = new FormData();
      scannedImage.forEach((image, index) =>
        formData.append(`files[${index}]`, {
          uri: image,
          type: 'image/jpeg',
          name: 'image.jpeg',
        }),
      );
      const response = await axios.post('/api/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (get(response, 'status', false) && response?.data) {
        await Toast.show({
          type: 'success',
          text1: response.message,
        });
        await dispatch(setScannedDocuments([]));
        navigation.navigate('Files');
      } else {
        console.log('====================================');
        console.log('Error Occured While Uploading', response);
        console.log('====================================');
        Toast.show({
          type: 'error',
          text1: response.message,
        });
        errorMessageHandler(response);
      }
    } catch (err) {
      console.log('error =>', err.message);
      Toast.show({
        type: 'error',
        text1: err.message,
      });
    } finally {
      dispatch(setBtnLoader(false));
    }
  };

  const handleDelete = id => {
    const files = scannedImage.filter((item, index) => index !== id);
    if (!files.length) {
      navigation.navigate('Files');
    }
    dispatch(setScannedDocuments(files ?? null));
  };

  return (
    <View style={styles.container}>
      <Header />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 5,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: THEME.COLORS.GRAY,
          marginBottom: 10,
        }}
      >
        <CustomText style={styles.text}>Scanned Documents</CustomText>
        <TouchableOpacity
          onPress={handleUpload}
          style={
            scannedImage.length >= 1 || !btnLoader
              ? styles.card
              : styles.cardLight
          }
          disabled={scannedImage.length < 1 || btnLoader}
        >
          {btnLoader ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <CustomText style={styles.deviceName}>Upload</CustomText>
          )}
        </TouchableOpacity>
      </View>
      <View>
        {scannedImage.length
          ? scannedImage?.map((file, index) => (
              <MenuView
                key={file}
                title="Menu Title"
                onPressAction={({ nativeEvent }) => {
                  if (nativeEvent.event === 'delete') {
                    handleDelete(index);
                  } else if (nativeEvent.event === 'edit') {
                    scanDocument(index);
                  }
                }}
                actions={[
                  {
                    id: 'edit',
                    title: 'Edit',
                    image: Platform.select({
                      ios: 'square.and.arrow.up',
                      android: 'ic_menu_edit',
                    }),
                    imageColor:
                      scheme === 'dark'
                        ? THEME.COLORS.WHITE
                        : THEME.COLORS.BLACK,
                  },
                  {
                    id: 'delete',
                    title: 'Delete',
                    image: Platform.select({
                      ios: 'trash',
                      android: 'ic_menu_delete',
                    }),
                    imageColor:
                      scheme === 'dark'
                        ? THEME.COLORS.WHITE
                        : THEME.COLORS.BLACK,
                  },
                ]}
                shouldOpenOnLongPress={true}
              >
                <View style={generalStyle.imageContainer}>
                  <ImageCustom file={file} />
                </View>
              </MenuView>
            ))
          : null}
      </View>
    </View>
  );
};

export default ScanDocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'flex-start',
    color: THEME.COLORS.WHITE,
  },
  card: {
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  cardLight: {
    backgroundColor: THEME.COLORS.GRAY_LIGHT,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 20,
  },
  fileImage: {
    width: '100%', // Adjust percentage as needed
    // minHeight: screenWidth * 0.5, // Adjust percentage as needed
    // maxHeight: screenWidth * 4 * 0.3,
    aspectRatio: 1,
    // marginTop: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const DocumentScanner = ({ handleBack }) => {
  console.log('+++++++++++++++ ITS PACKAGE ++++++++++++++++');
  const camera = useRef(null);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission();

      if (permission === 'denied') await Linking.openSettings();
    };
    getPermission();
  }, []);

  const takePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
    }
  };

  const handleCameraError = e => {
    console.warn('error', e);
  };

  if (device == null) {
    return <Text style={{ color: 'black' }}>Camera Not Available.</Text>;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
            onError={handleCameraError}
          />
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              bottom: 0,
              padding: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: 'gray',
                width: 50,
                height: 50,
                borderColor: 'white',
                borderRadius: 50,
              }}
              onPress={takePhoto}
            />
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              source={{ uri: `file://${imageSource}` }}
              style={{ width: '100%', height: 200 }}
            />
          ) : null}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={handleBack}
            >
              <Text style={{ color: 'white', fontWeight: 500 }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => setShowCamera(true)}
              >
                <Text style={{ color: 'black', fontWeight: 500 }}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
                onPress={() => setShowCamera(true)}
              >
                <Text style={{ color: 'white', fontWeight: 500 }}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default DocumentScanner;

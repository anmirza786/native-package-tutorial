import { useCallback, useEffect } from 'react';
import DocumentScanner from 'docsument-scanner';
import { useRoute } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const DocScannerComponent = ({ navigation }) => {
  const route = useRoute();
  const previousScreenName = route?.params?.previousScreen;
  const handleBackButton = useCallback(() => {
    if (previousScreenName) {
      navigation.replace(previousScreenName, { previousScreen: route.name });
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
  return <DocumentScanner handleBack={handleBackButton} />;
};

export default DocScannerComponent;

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import moment from 'moment';
import Header from '../../components/Header';
import { getAlbumById } from '../../shared/api';
import generalStyle from '../../styles';
import ImageCustom from '../../components/CustomImage/ImageCustom';

const FileViewer = ({ isChild, route, navigation }) => {
  const [files, setFiles] = useState(null);
  const { documentId } = route.params;

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

  const getAlbumDocuments = useCallback(async () => {
    if (documentId) {
      try {
        const response = await getAlbumById(documentId);
        if (response) setFiles(response);
      } catch (e) {
        console.log(e, 'error');
      }
    }
  }, [documentId]);

  useEffect(() => {
    getAlbumDocuments();
  }, []);

  return (
    <View style={styles.container}>
      {files ? (
        <Header
          isChild={isChild}
          headerText={moment(files?.created_at).format('DD/MM/yyyy hh:mm')}
        />
      ) : null}

      {files
        ? files?.documents?.map(file => {
            return (
              <View key={file.id} style={generalStyle.imageContainer}>
                <ImageCustom file={file?.full_path} />
              </View>
            );
          })
        : null}
    </View>
  );
};

export default FileViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

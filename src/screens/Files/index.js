import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  SafeAreaView,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import CustomText from '../../components/CustomText';
import { getAlbumsListing } from '../../shared/api';
import FileCard from '../../components/FileCard';

const Files = ({ navigation }) => {
  const filesData = useSelector(state => state.FilesData.filesData);

  const loading = useSelector(state => state.Theme.btnLoader);
  const [files, setFiles] = useState([]);

  const isFocused = useIsFocused();

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

  useEffect(() => {
    getAlbumsListing();
  }, [getAlbumsListing, isFocused]);

  useEffect(() => {
    (() => {
      setFiles(filesData?.data);
    })();
  }, [filesData]);

  const handleLoadMore = () => {
    if (!loading && (filesData?.page < filesData?.total_page_count ?? 1)) {
      getAlbumsListing({ page: filesData?.page + 1 }, files);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.footer} />;
  };

  return (
    <View style={{ height: '100%' }}>
      <Header />
      <CustomText style={styles.text}>Recent Files</CustomText>
      <View style={{ height: '71%' }}>
        <FlatList
          data={files}
          keyExtractor={item => item?.id}
          renderItem={({ item }) => (
            <FileCard navigation={navigation} document={item} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
};

export default Files;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
});

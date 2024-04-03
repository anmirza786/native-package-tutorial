import React from 'react';
import THEME from '../../config/theme';
import moment from 'moment';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const FileCard = ({ document, navigation }) => {
  const route = useRoute();
  const screenName = route.name;

  const handleViewFile = id => {
    navigation.navigate('FileViewer', {
      documentId: id,
      previousScreen: screenName,
    });
  };
  return (
    <Pressable
      style={styles.cardBackground}
      key={document?.id}
      onPress={() => handleViewFile(document.id)}
    >
      <Image
        style={styles.cardImage}
        resizeMode="contain"
        src={document?.fullPath}
      />

      <View style={styles.cardContentArea}>
        <Text style={styles.cardContent} ellipsizeMode="tail" numberOfLines={2}>
          {document?.originalName}
        </Text>
        <Text style={styles.cardContent}>
          {moment(document?.createdAt).format('DD/MM/yyyy HH:mm')}
        </Text>
      </View>
    </Pressable>
  );
};

export default FileCard;
const styles = StyleSheet.create({
  cardBackground: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardImage: { width: 57, height: 67 },
  cardContentArea: {
    marginHorizontal: 10,
    width: 220,
    justifyContent: 'center',
  },
  cardContent: {
    color: THEME.COLORS.BLACK,
  },
});

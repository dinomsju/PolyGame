import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function MovieItem({ goTo, id, image, name }) {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable onPress={() => navigation.navigate(goTo, { id })}>
        <View style={styles.container}>
          <ActivityIndicator
            size="small"
            color="#E54028"
            style={styles.activityIndicator}
          />
          <FastImage
            source={{
              uri: `${image}`,
            }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'white',
              padding: 5,
              width: (width / 2) - 10
            }}
            numberOfLines={1}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'relative',
    marginBottom: 5,
    marginRight: width * 0.01,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  image: {
    width: (width / 2) - 10,
    height: 250,
    borderRadius: 5,
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: 80,
  },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Image
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function MovieItem({ goTo, id, image, name }) {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable onPress={() => navigation.navigate(goTo, { id })}>
        <View style={[styles.container, { marginLeft: 5 }]}>
          <ActivityIndicator
            size="small"
            color="#E54028"
            style={styles.activityIndicator}
          />
          <Image
            source={{
              uri: `${image}`,
            }}
            style={styles.image}
            resizeMode='cover'
          />
          <Text
            style={{
              fontFamily: "Gilroy-ExtraBold",
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
    marginRight: 5,
    borderRadius: 5,
  },
  image: {
    width: (width / 2) - 10,
    height: 250,
    borderRadius: 5,
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: 125,
  },
});

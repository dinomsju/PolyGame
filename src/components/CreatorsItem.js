import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function PeopleItem({ goTo, id, image, name }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate(goTo, { id })}>
        <ActivityIndicator
          size="large"
          color="red"
          style={styles.activityIndicator}
        />
        <Image
          source={{
            uri: `${image}`,
          }}
          style={styles.image}
        // resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.name}>{name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
    margin: width * 0.01,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  image: {
    width: width * 0.475,
    height: 220,
    borderRadius: 5,
    backgroundColor: 'gray'
  },
  name: {
    paddingHorizontal: 3,
    paddingVertical: 5,
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray'
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: 80
  },
});

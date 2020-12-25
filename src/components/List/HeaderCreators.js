import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import common from '../../theme/common'
import { FlatList } from 'react-native-gesture-handler';
import GameCreators from './GameCreators';
import Ionicons from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Header({ backTo, image, background, name, positions, games }) {
  const navigation = useNavigation();

  const _renderItem = ({ item }) => (
    <GameCreators
      goTo="DetailGames"
      id={item.id}
      image={item.background_image}
      name={item.name}
    />
  );

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.background}
          resizeMode="cover"
          source={{ uri: `${background}` }}
        />
      </View>
      <Image
        source={{
          uri: `${image}`,
        }}
        style={styles.image}
      />
      <View style={styles.inner}>
        <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Gilroy-ExtraBold', fontSize: 25, paddingVertical: 5 }}>{name}</Text>
        <Text style={{ borderColor: 'white', borderWidth: 1, height: 2, marginHorizontal: 60 }}></Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
          <Text style={{ fontSize: 20, fontFamily: 'Gilroy-ExtraBold', textAlign: 'center', color: 'white' }}>
            {positions ? positions.map(function (positions, index) {
              if (index == 0)
                return " " + positions.name.charAt(0).toUpperCase() + positions.name.slice(1);
              else
                return ", " + positions.name.charAt(0).toUpperCase() + positions.name.slice(1);
            }) : null}
          </Text>
        </View>
        <TouchableOpacity>
          <LinearGradient colors={['black', '#232526']} style={{ padding: 10, borderRadius: 10, marginVertical: 5, width: 175, marginHorizontal: 105 }}>
            <Text style={{ fontFamily: 'Gilroy-ExtraBold', color: 'white', textAlign: 'center', fontSize: 18 }}>Follow</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View>
          <Text style={[common.title, { color: 'white', padding: 10, marginVertical: 10 }]}>Known For Games</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </View>
      </View>
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    height: height + 50,
    paddingTop: 20,
    paddingLeft: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  image: {
    backgroundColor: 'black',
    marginTop: -70,
    borderRadius: 100,
    alignSelf: 'center',
    height: 140,
    width: 140,
    position: 'absolute',
    top: 140
  },
  background: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    height: height + 100,
    width: width,
    opacity: 0.5,
    backgroundColor: 'black'
  },
  inner: {
    position: 'absolute',
    top: 215,
    width: width,
    justifyContent: 'center'
  },
});

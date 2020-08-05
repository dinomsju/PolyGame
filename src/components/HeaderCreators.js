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
  ViewComponent,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import common from '../theme/common'
import { FlatList } from 'react-native-gesture-handler';
import GameCreators from '../components/GameCreators';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Header({ backTo, image, background, name, positions, games }) {
  const navigation = useNavigation();

  const _renderItem = ({ item }) => (
    <View style={{ marginHorizontal: 10, padding: 5 }}>
      <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20, paddingVertical: 5 }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
    </View >
  );

  const _renderGame = ({ item }) => (
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
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <Image
          style={styles.background}
          resizeMode="cover"
          source={{ uri: `${background}` }}
        />

        <TouchableOpacity
          style={{
            width: 100,
            position: 'absolute',
            top: 20,
            left: 10,
          }}
          onPress={() => navigation.navigate(backTo)}>
          <View style={common.row}>
            <Image
              style={common.icon}
              source={require('../assets/icons/ic_back.png')}
            />
            <Text style={common.backButton}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: `${image}`,
        }}
        style={styles.image}
      />
      <View style={styles.inner}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 25, paddingVertical: 5 }}>{name}</Text>
        <Text style={{ borderColor: 'white', borderWidth: 1, height: 2, width: width / 1.5, marginHorizontal: 60 }}></Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={positions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
        <TouchableOpacity>
          <LinearGradient colors={['black', '#232526']} style={{ padding: 15, borderRadius: 10, margin: 5, width: 175, marginHorizontal: 105 }}>
            <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 18 }}>Follow</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View>
          <Text style={[common.title, { color: 'white', padding: 10, marginVertical: 15 }]}> Known For Games</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderGame}
          />
        </View>
      </View>
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    height: height,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  image: {
    backgroundColor: 'black',
    marginTop: -70,
    borderRadius: 100,
    alignSelf: 'center',
    height: 140,
    width: 140,
    position: 'absolute',
    top: 130
  },
  background: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    height: height,
    width: width,
    opacity: 0.6,
    backgroundColor: 'black'
  },
  inner: {
    position: 'absolute',
    top: 200,
    width: width,
  },
});

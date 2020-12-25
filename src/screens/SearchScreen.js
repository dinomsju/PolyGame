import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import axiosConfig from '../api/axios';
import GameItem from '../components/List/GameItem';
import CreatorsItem from '../components/List/CreatorsItem';
import SearchBar from '../components/SearchBar';
import LottieView from 'lottie-react-native'

const TAGs = {
  games: 'games',
  creators: 'creators',
};

export default function SearchScreen({ route }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const tag = route.params.tag;
  const numColumn = 3;

  useEffect(() => {
    axiosConfig
      .get(`/${TAGs[tag]}?page=${page}&search=${route.params.query}`)
      .then((response) => {
        // setData(response.data.results);
        setData((oldGames) => oldGames.concat(response.data.results));
        setLoading(false);
      });
  }, [route.params.query, tag, page]);

  const _renderItem = ({ item }) => {
    if (tag === 'games') {
      return (
        <GameItem goTo="DetailGames"
          id={item.id}
          image={item.background_image}
          name={item.name}
          released={item.released == null ? "" : item.released}
          rating={item.rating}
        />
      );
    }

    if (loading) {
      return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />;;
    }

    return (
      <CreatorsItem
        goTo="DetailCreators"
        id={item.id}
        image={item.image}
        name={item.name}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar goTo="SearchScreen" backTo="Main" tag={route.params.tag} />
      <FlatList
        numColumns={numColumn}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 55
  },
});

import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import axiosConfig from '../api/axios';
import GameItem from '../components/List/GameItem';
import CreatorsItem from '../components/List/CreatorsItem';
import SearchBar from '../components/SearchBar';

const TAGs = {
  games: 'games',
  creators: 'creators',
};

export default function SearchScreen({ route }) {
  const [data, setData] = useState([]);
  const tag = route.params.tag;
  const numColumn = 3;

  useEffect(() => {
    axiosConfig
      .get(`/${TAGs[tag]}?search=${route.params.query}`)
      .then((response) => {
        setData(response.data.results);
      });
  }, [route.params.query, tag]);

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 55
  },
});

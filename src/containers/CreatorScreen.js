import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axiosConfig, { apiKey } from '../api/axios';
import CreatorsItem from '../components/CreatorsItem';
import SearchBar from '../components/SearchBar';

export default function CreatorScreen() {
  const [creators, setCreators] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const numColumns = 2;

  useEffect(() => {
    axiosConfig
      .get(`/creators?page=${page}`)
      .then((response) => {
        setCreators((oldData) => oldData.concat(response.data.results));
        setLoading(false);
      });
  }, [page]);

  return (
    <View style={{ paddingBottom: 60 }}>
      <SearchBar goTo="SearchScreen" backTo="Main" tag="creators" />

      <FlatList
        numColumns={numColumns}
        data={creators}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CreatorsItem
            goTo="DetailCreators"
            id={item.id}
            image={item.image}
            name={item.name}
          />
        )}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

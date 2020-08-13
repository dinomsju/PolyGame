import React, { useEffect, useState } from 'react';
import { FlatList, View, StatusBar } from 'react-native';
import axiosConfig, { apiKey } from '../api/axios';
import CreatorsItem from '../components/List/CreatorsItem';
import SearchBar from '../components/SearchBar';
import LottieView from 'lottie-react-native'
import { useTheme } from 'react-native-paper'

export default function CreatorScreen() {
  const [creators, setCreators] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const numColumns = 2;
  const { colors } = useTheme();

  useEffect(() => {
    axiosConfig
      .get(`/creators?page=${page}`)
      .then((response) => {
        setCreators((oldData) => oldData.concat(response.data.results));
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />
  }

  return (
    <View style={{ paddingBottom: 110 }}>
      <StatusBar backgroundColor={colors.background} barStyle='dark-content' />
      <View>
        <SearchBar goTo="SearchScreen" backTo="Main" tag="creators" />
        <FlatList
          numColumns={numColumns}
          data={creators}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CreatorsItem
              goTo="DetailCreators"
              id={item.id}
              image={item.image == null ? item.image_background : item.image}
              name={item.name}
            />
          )}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
}

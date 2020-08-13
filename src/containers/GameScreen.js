import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, StatusBar } from 'react-native';
import axiosConfig from '../api/axios';
import GameItem from '../components/List/GameItem'
import SearchBar from '../components/SearchBar';
import LottieView from 'lottie-react-native'
import { useTheme } from 'react-native-paper'

export default function GameScreen() {
    const [data, setData] = useState({});
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    useEffect(() => {
        axiosConfig
            .get(`/games?dates=2020-01-01,2021-12-31&ordering=-rating?page=1&page=${page}`)
            .then((response) => {
                setData(response.data);
                setGames((oldGames) => oldGames.concat(response.data.results));
                setLoading(false);
            });
    }, [page]);

    if (loading) {
        return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />;;
    }
    return (
        <View style={{ marginBottom: 55 }}>
            <StatusBar backgroundColor={colors.background} />
            <SearchBar goTo="SearchScreen" backTo="Main" tag="games" />
            <FlatList
                data={games}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <GameItem goTo="DetailGames"
                        id={item.id}
                        image={item.background_image}
                        name={item.name}
                        released={item.released == null ? "" : item.released}
                        rating={item.rating}
                    />
                )}
                onEndReached={() => setPage(page + 1)}
                onEndReachedThreshold={0.1}
            />
        </View>
    )
}
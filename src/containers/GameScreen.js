import React, { useEffect, useState } from 'react';
import { FlatList, View, RefreshControl, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import axiosConfig from '../api/axios';
import GameItem from '../components/GameItem'
import SearchBar from '../components/SearchBar';
import LottieView from 'lottie-react-native'

export default function GameScreen() {
    const [data, setData] = useState({});
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig
            .get(`/games?page=${page}`)
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
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <SearchBar goTo="SearchScreen" backTo="Main" tag="games" />
            <View>
                <FlatList
                    data={games}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <GameItem goTo="DetailGames"
                            id={item.id}
                            image={item.background_image}
                            name={item.name}
                            released={item.released == null ? "" : item.released.substring(0, 4)}
                            rating={item.rating}
                        />
                    )}
                    onEndReached={() => setPage(page + 1)}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 110,
    },
});
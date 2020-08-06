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

    const _loading = () => {
        // setLoading('flex');
        setPage(page + 1);
    };

    if (loading) {
        return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />;;
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <SearchBar />
            <View>
                <FlatList
                    data={games}
                    showsVerticalScrollIndicator={false}
                    onEndReached={_loading}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <GameItem goTo="DetailGames"
                            id={item.id}
                            image={item.background_image}
                            name={item.name}
                            released={item.released.substring(0, 4)}
                            rating={item.rating}
                        />
                    )}
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
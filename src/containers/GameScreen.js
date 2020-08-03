import React, { useEffect, useState } from 'react';
import { FlatList, View, RefreshControl, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import axiosConfig from '../api/axios';
import GameItem from '../components/GameItem'
import SearchBar from '../components/SearchBar';

export default function GameScreen() {
    const [data, setData] = useState({});
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState('none');

    useEffect(() => {
        axiosConfig
            .get(`/games?page=${page}`)
            .then((response) => {
                setData(response.data);
                setGames((oldGames) => oldGames.concat(response.data.results));
                setLoading('none');
            });
    }, [page]);

    const _loading = () => {
        setLoading('flex');
        setPage(page + 1);
    };
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
                            released={item.released}
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
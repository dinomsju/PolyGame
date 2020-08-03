import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axiosConfig from '../api/axios';
import GameItem from '../components/FlatList/GameItem'
import common from '../theme/common'
import SearchBar from '../components/SearchBar'

export default function GameScreen() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGames();
    }, []);

    const getGames = async () => {
        try {
            const getGames = axiosConfig.get(`/games`);
            const [
                dataGames
            ] = await Promise.all([
                getGames
            ]);

            setGames(dataGames.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const _renderItem = ({ item }) => (
        <GameItem goTo="DetailGames"
            id={item.id}
            image={item.background_image}
            name={item.name}
            released={item.released}
            rating={item.rating}
        />
    );

    return (
        <View style={[common.container, { marginBottom: 90 }]}>
            <SearchBar />
            <ScrollView style={{ paddingHorizontal: 5 }}>
                <FlatList
                    data={games}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                />
            </ScrollView>
        </View>
    )
}

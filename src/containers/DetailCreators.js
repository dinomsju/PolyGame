import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import axiosConfig from '../api/axios';
import Header from '../components/HeaderCreators';
import GameItem from '../components/GameItem';
import common from '../theme/common';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function DetailPeople({ route }) {
    const [data, setData] = useState({});
    const [games, setGames] = useState({});
    const [position, setPosition] = useState('');

    useEffect(() => {
        axiosConfig
            .get(`/creators/${route.params.id}`)
            .then((response) => {
                setData(response.data);
                setPosition(response.data.positions);
            });

        axiosConfig
            .get(`/games?creators=${route.params.id}`)
            .then((response) => {
                setGames(response.data.results);
            });
    }, [route.params.id]);
    return (
        <View style={{ flex: 1, paddingBottom: 50 }}>
            <Header
                backTo="Main"
                image={data.image}
                background={data.image_background}
                name={data.name}
                positions={position}
                games={games} />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    left_block: {
        width: width * 0.3,
        fontFamily: 'Roboto-Light',
    },
    right_block: {
        width: width * 0.7,
        fontFamily: 'Roboto-Light',
    },
});

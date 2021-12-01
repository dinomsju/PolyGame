import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native'
import axiosConfig from '../api/axios'
import Header from '../components/List/HeaderCreators'
import LottieView from 'lottie-react-native'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function DetailCreators({ route }) {
    const [data, setData] = useState({});
    const [games, setGames] = useState({});
    const [position, setPosition] = useState('');
    const [loading, setLoading] = useState(true);
    const key = 'key=607302fdf5d74a98bcd6180678ad4758'

    useEffect(() => {
        axiosConfig
            .get(`/creators/${route.params.id}?${key}`)
            .then((response) => {
                setData(response.data);
                setPosition(response.data.positions);
                setLoading(false);
            });

        axiosConfig
            .get(`/games?${key}&creators=${route.params.id}`)
            .then((response) => {
                setGames(response.data.results);
                setLoading(false);
            });
    }, [route.params.id]);

    if (loading) {
        return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />
    }

    return (
        <View style={{ flex: 1, paddingBottom: 50 }}>
            <Header
                // backTo="Main"
                image={data.image == null ? data.image_background : data.image}
                background={data.image_background}
                name={data.name}
                positions={position == null ? '' : position}
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

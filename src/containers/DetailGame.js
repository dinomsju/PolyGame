import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Linking, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axiosConfig from '../api/axios';
import Content from '../components/Content';
import Overview from '../components/Overview';
import Stores from '../components/Stores';
import Header from '../components/Header';
import Button from '../components/Button';
import Trailers from '../components/Trailers';
import common from '../theme/common';
import LottieView from 'lottie-react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function DetailGame({ navigation, route }) {
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig
            .get(`/games/${route.params.id}`)
            .then((response) => {
                setData(response.data);
                setGenres(response.data.genres);
                setRatings(response.data.ratings);
                setStores(response.data.stores);
                setLoading(false);
            });
    }, [route.params.id]);

    if (loading) {
        return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />;;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main')}>
                    <View style={common.row}>
                        <Ionicons name="arrow-back" color={'white'} size={32} />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header
                    imageHeader={data.background_image}
                    backTo="Main" />
                <Content
                    title={data.name}
                    release_date={data.released.substring(0, 4)}
                    genres={genres}
                    ratings={ratings}
                    rating={data.rating}
                    vote_rating={data.rating}
                />
                <Overview overview={data.description_raw} />
                <Stores
                    stores={stores}
                />
                <Button
                    goTo={data.website}
                    label={'Click To The Home Page'} />
                <Trailers
                    trailers={data.clip !== null ? data.clip.clip : ''}
                />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#000'
    },
    backButton: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    icon: {
        marginRight: 5,
        marginTop: Platform.OS === 'ios' ? 0 : 2,
        height: 15,
        width: 15,
    },
});

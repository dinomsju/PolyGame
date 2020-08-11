import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import axiosConfig from '../api/axios';
import Header from '../components/List/Header';
import Overview from '../components/Overview';
import Stores from '../components/Stores';
import Button from '../components/Button';
import Trailers from '../components/Trailers';
import Series from '../components/List/Series';
import Screenshots from '../components/List/Screenshots';
import common from '../theme/common';
import LottieView from 'lottie-react-native'
import Animated from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 10 + StatusBar.currentHeight;
export default function DetailGame({ navigation, route }) {

    const scrollY = new Animated.Value(0);
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
    const headerY = Animated.interpolate(diffClampScrollY, {
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT]
    })

    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [stores, setStores] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [series, setSeries] = useState([]);
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

        axiosConfig
            .get(`/games/${route.params.id}/screenshots`)
            .then((response) => {
                setScreenshots(response.data.results);
                setLoading(false);
            });
        axiosConfig
            .get(`/games/${route.params.id}/game-series`)
            .then((response) => {
                setSeries(response.data.results);
                console.log(response.data.results);
                setLoading(false);
            });
    }, [route.params.id]);

    if (loading) {
        return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />;;
    }

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: HEADER_HEIGHT,
                    backgroundColor: 'black',
                    zIndex: 1000,
                    elevation: 1000,
                    transform: [{ translateY: headerY }]
                }}>
                <TouchableOpacity
                    style={{ paddingLeft: 5 }}
                    onPress={() => navigation.navigate('Main')}>
                    <View style={common.row}>
                        <Ionicons name="ios-chevron-back" color={'white'} size={30} />
                        <Text style={[common.title, { color: 'white', paddingLeft: 10, width: 350 }]} numberOfLines={1}>{data.name}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <Animated.ScrollView
                bounces={false}
                scrollEventThrottle={16}
                style={{ paddingTop: 20 }}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { y: scrollY } }
                    }
                ])}
                showsVerticalScrollIndicator={false}>
                <Trailers
                    trailers={data.clip != null ? data.clip.clip : data.background_image}
                />
                <Header
                    title={data.name}
                    release_date={data.released == null ? '' : data.released.substring(0, 4)}
                    genres={genres}
                    ratings={ratings}
                    rating={data.rating}
                    vote_rating={data.rating}
                />
                <Overview overview={data.description_raw}
                />
                <Stores
                    stores={stores}
                />
                <Button
                    goTo={data.website}
                    label={'Click To The Home Page'}
                />

                <Screenshots
                    screenshots={screenshots}
                />
                <Series
                    series={series}
                />

            </Animated.ScrollView>
        </View >
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

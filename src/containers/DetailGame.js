import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axiosConfig from '../api/axios';
import Content from '../components/List/Content';
import Overview from '../components/Overview';
import Stores from '../components/Stores';
import Header from '../components/List/Header';
import Button from '../components/Button';
import Trailers from '../components/Trailers';
import common from '../theme/common';
import LottieView from 'lottie-react-native'
import Animated from 'react-native-reanimated'

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
                    style={{ padding: 5, paddingLeft: 10 }}
                    onPress={() => navigation.navigate('Main')}>
                    <View style={common.row}>
                        <Image
                            style={common.icon}
                            source={require('../assets/icons/ic_back.png')}
                        />
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
                <Header
                    imageHeader={data.background_image}
                    backTo="Main" />
                <Content
                    title={data.name}
                    release_date={data.released == null ? '' : data.released.substring(0, 4)}
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

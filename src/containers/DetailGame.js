import React, { useEffect, useState, useRef } from 'react';
import { View, StatusBar, StyleSheet, ScrollView, Dimensions, Text, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axiosConfig from '../api/axios';
import Header from '../components/List/Header';
import Overview from '../components/Overview';
import Stores from '../components/Stores';
import Button from '../components/Button';
import Trailers from '../components/Trailers';
import Series from '../components/List/Series';
import Screenshots from '../components/List/Screenshots';
import LottieView from 'lottie-react-native'
import HeaderImageScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 220;

export default function DetailGame({ navigation, route }) {
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [stores, setStores] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    const navTitleView = useRef(null);

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
                setLoading(false);
            });
    }, [route.params.id]);

    if (loading) {
        return <LottieView style={{ backgroundColor: '#ffffff' }} source={require('../assets/icons/covicLoad.json')} autoPlay loop />;;
    }

    return (
        <View style={styles.container}>
            <HeaderImageScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.3}
                renderHeader={() => (
                    // <Image source={{ uri: data.background_image }} style={styles.image} />
                    <View style={styles.image}>
                        <Trailers
                            trailers={data.clip != null ? data.clip.clip : data.background_image}
                        />
                    </View>
                )}
                renderFixedForeground={() => (
                    <Animatable.View style={styles.navTitleView} ref={navTitleView}>
                        <Text style={styles.navTitle} numberOfLines={1}>{data.name}</Text>
                    </Animatable.View>
                )}>
                <TriggeringView
                    style={styles.section}
                    onHide={() => navTitleView.current.fadeInUp(200)}
                    onDisplay={() => navTitleView.current.fadeOut(100)}>
                    <Header
                        title={data.name}
                        release_date={data.released == null ? '' : data.released}
                        genres={genres}
                        ratings={ratings}
                        rating={data.rating}
                        vote_rating={data.rating}
                    />
                </TriggeringView>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Overview overview={data.description_raw}
                    />
                    <Stores
                        stores={stores}
                    />
                    <Screenshots
                        screenshots={screenshots}
                    />
                    <Series
                        series={series}
                    />

                </ScrollView>
            </HeaderImageScrollView>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    section: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 5,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Gilroy-ExtraBold',
        backgroundColor: 'transparent',
        width: '70%',
    },
    sectionLarge: {
        minHeight: 300,
    },
});

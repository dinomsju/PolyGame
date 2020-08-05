import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Linking, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axiosConfig from '../api/axios';
import Content from '../components/Content';
import Overview from '../components/Overview';
import DetailHolder from '../components/Holder';
import Platforms from '../components/Platforms';
import Header from '../components/Header';
import Button from '../components/Button';
import Trailers from '../components/Trailers';
import common from '../theme/common';



export default function DetailGame({ navigation, route }) {
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig
            .get(`/games/${route.params.id}`)
            .then((response) => {
                setData(response.data);
                setGenres(response.data.genres);
                setRatings(response.data.ratings);
                setPlatforms(response.data.parent_platforms);
                setLoading(false);
            });
    }, [route.params.id]);

    if (loading) {
        return <DetailHolder />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main')}>
                    <View style={common.row}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/ic_back.png')}
                        />
                        <Text style={styles.backButton}>Back</Text>
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
                <Platforms
                    platforms={platforms}
                    goTo="Platforms  "
                />
                <Button
                    goTo={data.website}
                    label={'Click to the home page'} />
                <Trailers
                    trailers={data.clip.clip}
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

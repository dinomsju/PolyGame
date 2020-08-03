import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, FlatList, Alert } from 'react-native';
import axiosConfig from '../api/axios';
import Header from '../components/Header'
import Overview from '../components/DetailScreen/Overview'
import DetailHolder from '../components/Placeholder/DetailHolder'

export default function DetailGame({ navigation, route }) {
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig
            .get(`/games/${route.params.id}`)
            .then((response) => {
                setData(response.data);
                setGenres(response.data.genres);
                setLoading(false);
            });
    }, [route.params.id]);

    if (loading) {
        return <DetailHolder />;
    }



    return (
        <View style={{ flex: 1 }}>
            <Header
                backdrop={data.background_image_additional}
                poster={data.background_image}
                title={data.name}
                release_date={data.released}
                genres={genres}
                runtime={data.playtime}
                rating={data.rating}
                vote_rating={data.rating}
                backTo="Games">
            </Header>
            <ScrollView>
                <Overview overview={data.description_raw} />
            </ScrollView>
        </View>
    )
}

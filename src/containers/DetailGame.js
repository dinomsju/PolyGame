import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import axiosConfig from '../api/axios';
import Header from '../components/Header';
import Overview from '../components/Overview';
import DetailHolder from '../components/DetailHolder';
import Platforms from '../components/Platforms';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function DetailGame({ navigation, route }) {
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig
            .get(`/games/${route.params.id}`)
            .then((response) => {
                setData(response.data);
                setGenres(response.data.genres);
                setPlatforms(response.data.parent_platforms);
                setLoading(false);
            });
    }, [route.params.id]);

    if (loading) {
        return <DetailHolder />;
    }



    return (
        <ScrollView
            showsVerticalScrollIndicator={false}>
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
                    backTo="Games"
                />
                <Overview overview={data.description_raw} />
                <Platforms
                    platforms={platforms}
                />
                <Button
                    icon={
                        <Entypo
                            name="globe"
                            size={15}
                            color="white"
                        />
                    }
                    title=" Go Websites"
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['black', '#232526'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    onPress={() => {
                        Linking.openURL(`${data.website}`)
                    }}
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: 'black'
    },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProgressCircle from 'react-native-progress-circle';
import common from '../theme/common';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Content({
    title,
    release_date,
    ratings,
    genres,
    vote_rating,

}) {
    const navigation = useNavigation();

    const _renderItem = ({ item }) => (
        <View style={{ margin: 2 }}>
            <LinearGradient colors={['black', '#232526']} style={{ borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, margin: 1 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}<Text style={{ color: 'gray', fontWeight: 'bold' }}>  {item.count}</Text></Text>
            </LinearGradient>
        </View>
    );

    return (
        <View style={[styles.container, { borderTopRightRadius: 20, borderTopLeftRadius: 20 }]}>
            <View
                style={{
                    paddingTop: 20,
                    flexDirection: 'row',
                }}>
                <View style={{ paddingHorizontal: 10, marginTop: -25, paddingTop: 10 }}>
                    {/* title */}
                    <Text style={[common.title, { marginVertical: 5, color: 'gray', fontSize: 22 }]}>{title}</Text>
                    {/* genres */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {genres.map(function (genre, index) {
                                if (index === 0)
                                    return " " + genre.name;
                                else
                                    return ", " + genre.name;
                            })}
                        </Text>
                    </View>
                    <View style={[common.row]}>
                        {/* release_date */}
                        <View style={[common.row, { alignItems: 'center', padding: 5 }]}>
                            <Ionicons name="calendar" size={18} style={{ paddingRight: 5 }} />
                            <Text style={[common.subtitle, { fontWeight: 'bold', color: 'gray' }]}>{release_date}</Text>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={ratings}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={_renderItem}
                        />
                    </View>
                    {/* <ProgressCircle
                        percent={(vote_rating) * 20}
                        radius={20}
                        borderWidth={3}
                        color="#E54028"
                        shadowColor="gray"
                        bgColor="#fff">
                        <Text style={[common.subtitle, { fontSize: 11, fontWeight: 'bold' }]}>{vote_rating}%</Text>
                    </ProgressCircle> */}
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
    },
    backdrop: {
        position: 'absolute',
        height: 200,
        width: '100%',
    },
    poster: {
        marginTop: -60,
        height: 170,
        width: width * 0.31,
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

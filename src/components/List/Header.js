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
import common from '../../theme/common';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Header({
    title,
    release_date,
    ratings,
    genres,
    rating,
    ratings_count

}) {
    const navigation = useNavigation();

    const _renderItem = ({ item }) => (
        <View style={{ margin: 2 }}>
            <LinearGradient colors={['black', '#232526']} style={{ borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, margin: 1 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Gilroy-ExtraBold' }}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}<Text style={{ color: 'gray' }}>  {item.count}</Text></Text>
            </LinearGradient>
        </View>
    );

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                }}>
                <View>
                    {/* title */}
                    <Text style={[common.title, { margin: 5, color: 'gray', fontSize: 22 }]}>{title}</Text>
                    {/* genres */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Gilroy-ExtraBold' }}>
                            {genres.map(function (genre, index) {
                                if (index === 0)
                                    return " " + genre.name;
                                else
                                    return ", " + genre.name;
                            })}
                        </Text>
                    </View>
                    <View style={common.row}>
                        {/* ratings */}
                        <View style={[common.row, { alignItems: 'center', padding: 5, marginRight: 20 }]}>
                            <Ionicons name="star" size={18} color={'#3b5998'} style={{ paddingRight: 2 }} />
                            <Text style={[common.subtitle, { fontFamily: 'Gilroy-ExtraBold', color: '#3b5998' }]}>{rating} <Text style={{ color: 'gray', fontFamily: 'Gilroy-Light' }}>({ratings_count})</Text> </Text>
                        </View>
                        {/* release_date */}
                        <View style={[common.row, { alignItems: 'center', padding: 5 }]}>
                            <Ionicons name="calendar" size={18} color={'#3b5998'} style={{ paddingRight: 2 }} />
                            <Text style={[common.subtitle, { fontFamily: 'Gilroy-ExtraBold', color: '#3b5998' }]}>{moment(release_date).format('LL')}</Text>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            paddingBottom={5}
                            data={ratings}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={_renderItem}
                        />
                    </View>
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
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

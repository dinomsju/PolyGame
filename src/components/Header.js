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


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Header({
    backdrop,
    title,
    release_date,
    backTo,
    runtime,
    poster,
    genres,
    vote_rating

}) {
    const navigation = useNavigation();
    const _renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>| {item.name} | </Text>
        </View>
    );
    return (
        <View style={styles.container}>
            {/* backdrop */}
            <View style={{ height: 210, position: 'relative' }}>
                <Image
                    source={{
                        uri: `${backdrop}`,
                    }}
                    style={styles.backdrop}
                    resizeMode='cover'
                // resizeMode={FastImage.resizeMode.cover}
                />

                <View style={{ backgroundColor: 'black', height: 200, opacity: 0.5 }} />

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 10,
                    }}
                    onPress={() => navigation.navigate(backTo)}>
                    <View style={common.row}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/ic_back.png')}
                        />
                        <Text style={styles.backButton}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    padding: 10,
                    flexDirection: 'row',
                    height: 120,
                }}>
                <Image
                    source={{
                        uri: `${poster}`,
                    }}
                    style={styles.poster}
                    resizeMode='cover'
                // resizeMode={FastImage.resizeMode.cover}
                />
                <View style={{ paddingHorizontal: 10, marginTop: -25, paddingTop: 10 }}>
                    {/* title */}
                    <Text style={common.title}>{title}</Text>
                    {/* genres */}
                    <ScrollView style={common.row}>
                        <FlatList
                            horizontal
                            data={genres}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={_renderItem}
                        />
                    </ScrollView>
                    <View style={[common.row, { marginBottom: 5 }]}>
                        {/* release_date */}
                        <View style={[common.row, { marginRight: 10, alignItems: 'center' }]}>
                            <Ionicons name="calendar" size={15} style={{ paddingRight: 5 }} />
                            <Text style={common.subtitle}>{release_date}</Text>
                        </View>

                        {/* runtime */}
                        <View style={[common.row, { marginRight: 30, alignItems: 'center' }]}>
                            <Feather name="clock" size={15} style={{ paddingRight: 5 }} />
                            <Text style={common.subtitle}>{runtime}</Text>
                        </View>
                    </View>
                    <ProgressCircle
                        percent={(vote_rating) * 20}
                        radius={20}
                        borderWidth={3}
                        color="#E54028"
                        shadowColor="gray"
                        bgColor="#fff">
                        <Text style={[common.subtitle, { fontSize: 11, fontWeight: 'bold' }]}>{vote_rating}%</Text>
                    </ProgressCircle>
                </View>
            </View>
        </View>
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

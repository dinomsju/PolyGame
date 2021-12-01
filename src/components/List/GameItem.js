import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View, Text, Image } from 'react-native';
import common from '../../theme/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

export default function MovieItem({ goTo, id, image, name, released, rating }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate(goTo, { id })}>
                <Image
                    source={{
                        uri: `${image}`,
                    }}
                    style={styles.image}
                    resizeMode='cover'
                />
                <View style={styles.innerName}>
                    <View>
                        <Text style={[common.title, { color: 'white' }]}>{name}</Text>
                        <Text style={[common.title, { color: 'white', fontSize: 16, opacity: 0.9 }]}>{moment(released).format('LL')}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="star" size={20} color={'yellow'} style={{ paddingRight: 5 }} />
                            <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 18, fontFamily: 'Gilroy-ExtraBold', paddingRight: 5 }}>{rating}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: 'white',
        margin: width * 0.01,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    image: {
        borderRadius: 10,
        width: width - 8,
        height: 200,
        alignSelf: 'center',
        opacity: 0.8,
        backgroundColor: 'gray',
    },
    innerName: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'flex-end',
        elevation: 1,
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: 80
    },
});

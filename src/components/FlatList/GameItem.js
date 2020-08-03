import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import common from '../../theme/common'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function MovieItem({ goTo, id, image, name, released, rating }) {
    const navigation = useNavigation();
    return (
        <View>
            <Pressable onPress={() => navigation.navigate(goTo, { id })}>
                <FastImage
                    source={{
                        uri: `${image}`,
                    }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.innerName}>
                    <View>
                        <Text style={[common.title, { color: 'white' }]}>{name}</Text>
                        <Text style={[common.title, { color: 'white', fontSize: 18, opacity: 0.7 }]}>{released}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.7 }}>
                            <Ionicons name="star" size={20} color={'yellow'} style={{ paddingRight: 5 }} />
                            <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 18, fontFamily: 'Roboto-Bold', paddingRight: 5 }}>{rating}</Text>
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
    image: {
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        width: width - 20,
        height: 200,
        alignSelf: 'center'
    },
    innerName: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 12,
        alignItems: 'flex-end',
    },
});

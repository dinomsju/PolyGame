import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import common from '../../theme/common'

export default function Header({ imageHeader, backTo }) {
    const navigation = useNavigation();
    return (
        <View style={{ height: 220, position: 'relative' }}>
            <Image
                source={{
                    uri: `${imageHeader}`
                }}
                style={{ height: 250, width: '100%', backgroundColor: 'black', opacity: 0.8 }}
                resizeMode='cover'
            />
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
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

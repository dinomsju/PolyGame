import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList, View, Dimensions, Image, Text } from 'react-native'
import common from '../../theme/common'

export default function Screenshots({ screenshots }) {
    const navigation = useNavigation();

    const _renderItem = ({ item }) => (
        <View style={{ padding: 5 }}>
            <Image
                style={{ width: width - 50, height: 200 }}
                source={{ uri: item.image }}
            />
        </View>
    );

    return (
        <View style={{ backgroundColor: 'white' }} >
            <Text style={[common.heading, { paddingLeft: 10 }]}>Screenshots</Text>
            <FlatList
                horizontal
                data={screenshots}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
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

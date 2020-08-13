import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList, View, Dimensions, Image, Text, ActivityIndicator } from 'react-native'
import common from '../../theme/common'

export default function Screenshots({ screenshots }) {
    const navigation = useNavigation();

    const _renderItem = ({ item }) => (
        <View style={{ margin: 5, backgroundColor: 'black', borderRadius: 5 }}>
            <ActivityIndicator
                size="small"
                color="#E54028"
                style={styles.activityIndicator}
            />
            <Image
                style={{ width: width - 10, height: 200, borderRadius: 5 }}
                source={{ uri: item.image }}
            />
        </View>
    );

    return (
        <View style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#cccccc' }} >
            <Text style={[common.heading, { paddingLeft: 10 }]}>Screenshots <Text style={{ color: 'red', fontFamily: 'Gilroy-light', fontSize: 17 }}>({screenshots.length})</Text></Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
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
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: 100,
    },
});

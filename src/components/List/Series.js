import React from 'react'
import { View, Text, FlatList } from 'react-native'
import common from '../../theme/common'
import GameCreators from './GameCreators'

export default function Series({ series }) {

    const _renderItem = ({ item }) => (
        <GameCreators
            goTo="DetailGames"
            id={item.id}
            image={item.background_image}
            name={item.name}
        />
    );

    return (
        <View>
            <Text style={[common.heading, { paddingLeft: 10 }]}>Other games in the series <Text style={{ color: 'red', fontFamily: 'Gilroy-light', fontSize: 17 }}>({series.length})</Text></Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={series}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
            />
        </View>
    )
}

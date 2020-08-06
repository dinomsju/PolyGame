import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Dimensions, Image } from 'react-native';
import common from '../theme/common';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Button from './Button';

const W = Dimensions.get('screen').width;
export default function Stores({ stores }) {
    const navigation = useNavigation();
    const _renderItem = ({ item, goTo }) => (
        <View style={{ padding: 2 }}>
            <Button
                goTo={item.url}
                label={item.store.name} />
        </View>
    );

    return (
        <View style={[common.container, { backgroundColor: 'white' }]} >
            <Text style={common.heading}>Where to buy</Text>
            <View>
                <FlatList
                    horizontal
                    paddingBottom={5}
                    data={stores}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                />
            </View>
        </View>
    );
}

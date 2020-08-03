import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import common from '../theme/common';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const W = Dimensions.get('screen').width;
export default function Platforms({ platforms }) {

    const _renderItem = ({ item }) => (
        <View>
            <LinearGradient colors={['black', '#232526']} style={{ padding: 10, borderRadius: 10, margin: 5, width: 175 }}>
                <TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 18 }}>{item.platform.name}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );

    return (
        <View style={[common.container, { backgroundColor: 'white' }]} >
            <Text style={common.heading}>Platforms</Text>
            <View>
                <FlatList
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    data={platforms}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                />
            </View>
        </View>
    );
}

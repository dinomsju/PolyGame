import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Dimensions, Image } from 'react-native';
import common from '../theme/common';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const W = Dimensions.get('screen').width;
export default function Platforms({ platforms }) {
    const navigation = useNavigation();
    const _renderItem = ({ item, goTo }) => (
        <View>
            <TouchableOpacity>
                <LinearGradient colors={['black', '#232526']} style={{ padding: 10, borderRadius: 10, margin: 5, width: 175 }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 18 }}>{item.platform.name}</Text>
                </LinearGradient>
            </TouchableOpacity>
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

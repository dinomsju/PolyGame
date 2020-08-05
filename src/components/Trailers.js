import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import common from '../theme/common';

export default function Trailers({ trailers }) {
    return (
        <View style={common.container}>
            <Text style={common.heading}>Trailers</Text>
            <WebView
                style={{ height: 209 }}
                source={{
                    uri: `${trailers}`
                }}
            />
        </View>
    )
}

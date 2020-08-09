import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import common from '../theme/common';

export default function Trailers({ trailers }) {

    const ActivityIndicatorLoadingView = () => {
        return (
            <ActivityIndicator
                color="#009688"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    return (
        <View>
            <WebView
                containerStyle
                style={{ height: 209 }}
                source={{ uri: `${trailers}` }}
                renderLoading={ActivityIndicatorLoadingView}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 40,
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
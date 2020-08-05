import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default function Button({ goTo, label }) {
    return (
        <RectButton onPress={() => {
            Linking.openURL(`${goTo}`)
        }}>
            <SafeAreaView style={{ backgroundColor: 'black' }} accessible>
                <View style={styles.container}>
                    <Text style={[styles.label, { color: 'white' }]}>
                        {label.toUpperCase()}
                    </Text>
                </View>
            </SafeAreaView>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 18
    },
});

import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Linking } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";

export default function Button({ goTo, label }) {
    return (
        <TouchableOpacity onPress={() => {
            Linking.openURL(`${goTo}`)
        }}>
            <SafeAreaView style={{ backgroundColor: 'black', borderRadius: 5, paddingHorizontal: 20 }} accessible>
                <View style={styles.container}>
                    <Text style={[styles.label, { color: 'white' }]}>
                        {label}
                    </Text>
                </View>
            </SafeAreaView>
        </TouchableOpacity>
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

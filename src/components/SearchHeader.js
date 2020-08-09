import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Button,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import SearchHeader from 'react-native-search-header';
import Ionicons from 'react-native-vector-icons/Ionicons'

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: DEVICE_WIDTH,
        height: 56,
        marginBottom: 6,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    label: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#f5fcff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});

export default function Search() {
    const searchHeaderRef = React.useRef(null);
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' hidden={true} />
            <View style={styles.header}>
                <Text style={styles.label}> Demo </Text>
                <TouchableOpacity
                    title="Search"
                    color="#00bcd4"
                    onPress={() => searchHeaderRef.current.show()}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <SearchHeader
                ref={searchHeaderRef}
                placeholder='Search...'
                placeholderColor='gray'
                pinnedSuggestions={[`Grand Theft Auto V`, `Cyberpunk2077`, `The Last of Us Part II`]}
                onClear={() => {
                    console.log(`Clearing input!`);
                }}
                onGetAutocompletions={async (text) => {
                    if (text) {
                        const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                            method: `get`
                        });
                        const data = await response.json();
                        return data[1];
                    } else {
                        return [];
                    }
                }}
            />
        </View>
    );
}
import React from 'react'
import { View, Text, Image, Platform, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

const images = [
    { id: 1, images: 'https://media.rawg.io/media/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg' },
    { id: 2, images: 'https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg' },
    { id: 3, images: 'https://media.rawg.io/media/games/088/088b41ca3f9d22163e43be07acf42304.jpg' },
    { id: 4, images: 'https://media.rawg.io/media/games/ad2/ad2ffdf80ba993654f31da045bc02456.jpg' }
]

const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 30 + StatusBar.currentHeight;

export default function Header() {
    const scrollY = new Animated.Value(0);
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
    const headerY = Animated.interpolate(diffClampScrollY, {
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT]
    })
    return (
        <View style={{ flex: 1 }}>
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: HEADER_HEIGHT,
                    backgroundColor: 'black',
                    zIndex: 1000,
                    elevation: 1000,
                    transform: [{ translateY: headerY }]
                }} />
            <Animated.ScrollView
                bounces={false}
                scrollEventThrottle={16}
                style={{ paddingTop: 40 }}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { y: scrollY } }
                    }
                ])}
            >
                {images.map(image => (
                    <View key={image.id} style={{ height: 400, margin: 20 }}>
                        <Image
                            source={{ uri: image.images }}
                            style={{ flex: 1, height: null, width: null, borderRadius: 20 }}
                        />
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    )
}

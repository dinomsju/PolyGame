import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import MainStack from './MainStack';
import GameScreen from '../containers/GameScreen';
import DetailGame from '../containers/DetailGame';

const Stack = createStackNavigator();

export default function RootStack() {
    useEffect(() => {
        SplashScreen.hide();
    });

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Games"
                screenOptions={{
                    headerShown: false,
                }}>
                {/* <Stack.Screen name="Main" component={MainStack} /> */}
                <Stack.Screen name="Games" component={GameScreen} />
                <Stack.Screen name="DetailGames" component={DetailGame} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import DetailGame from '../containers/DetailGame';
import MainStack from './MainStack';
import DetailCreators from '../containers/DetailCreators';
import SearchScreen from '../containers/SearchScreen';

const Stack = createStackNavigator();

export default function RootStack() {
    useEffect(() => {
        SplashScreen.hide();
    });
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main">
                <Stack.Screen name="Main" component={MainStack} options={{
                    headerShown: false
                }} />
                <Stack.Screen
                    name="DetailGames"
                    component={DetailGame}
                    options={({ route }) => ({
                        headerBackTitleVisible: false,
                        headerTitle: false,
                        headerTransparent: true,
                        headerTintColor: '#fff'
                    })}

                />
                <Stack.Screen
                    name="DetailCreators"
                    component={DetailCreators}
                    options={({ route }) => ({
                        headerBackTitleVisible: false,
                        headerTitle: false,
                        headerTransparent: true,
                        headerTintColor: '#fff'
                    })}
                />
                <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={({ route }) => ({
                        headerBackTitleVisible: false,
                        headerTitle: false,
                        headerTransparent: true,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

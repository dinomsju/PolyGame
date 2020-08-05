import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import GameScreen from '../containers/GameScreen';
import CreatorScreen from '../containers/CreatorScreen'

const Tab = createBottomTabNavigator();

export default function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName="Games"
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#A4A4A4',
                showLabel: false,
                style: {
                    backgroundColor: 'black',
                },
            }}>
            <Tab.Screen
                name="Games"
                component={GameScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="game-controller" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="Genres"
                component={GameScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="layer-group" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Creators"
                component={CreatorScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="user-secret" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
